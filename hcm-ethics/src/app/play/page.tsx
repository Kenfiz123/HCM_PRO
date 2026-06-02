"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import GameBoard from "@/components/GameBoard";
import QuizModal from "@/components/QuizModal";
import { QuizQuestion } from "@/data/questions";
import { makeBotMove } from "@/lib/botLogic";
import {
  Board,
  checkWinner,
  cloneBoard,
  createEmptyBoard,
  GameResult,
  getRandomQuestion,
  hasNearWinThreat,
  isBoardFull,
  Move,
  shouldShowQuiz,
  suggestPlayerMove,
  WinnerState,
} from "@/lib/gameLogic";
import { calculateScore, getResultLabel } from "@/lib/scoring";
import { submitScore } from "@/lib/supabaseClient";

type Turn = "player" | "bot" | "ended";
type Skill = "hint" | "skipBot" | "removeBot";

const SKILL_LABELS: Record<Skill, string> = {
  hint: "Gợi ý nước đi",
  skipBot: "Khóa bot 1 lượt",
  removeBot: "Xóa quân bot",
};

const SKILL_POOL: Skill[] = ["hint", "skipBot", "removeBot"];

function pickRandomSkill(): Skill {
  return SKILL_POOL[Math.floor(Math.random() * SKILL_POOL.length)];
}

function resultFromWinner(winner: "X" | "O" | null): GameResult {
  if (winner === "X") {
    return "win";
  }

  if (winner === "O") {
    return "lose";
  }

  return "draw";
}

export default function PlayPage() {
  const [playerName] = useState(() =>
    typeof window === "undefined" ? "Khách mời" : localStorage.getItem("caro-player-name") || "Khách mời",
  );
  const [board, setBoard] = useState<Board>(() => createEmptyBoard());
  const [turn, setTurn] = useState<Turn>("player");
  const [winnerState, setWinnerState] = useState<WinnerState>({ winner: null, line: [] });
  const [result, setResult] = useState<GameResult | null>(null);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [playerMoveCount, setPlayerMoveCount] = useState(0);
  const [totalMoves, setTotalMoves] = useState(0);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [hintMove, setHintMove] = useState<Move | null>(null);
  const [skipBotNext, setSkipBotNext] = useState(false);
  const [enhancedBotNext, setEnhancedBotNext] = useState(false);
  const [removeMode, setRemoveMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [askedQuestionIds, setAskedQuestionIds] = useState<string[]>([]);
  const [pendingBotAfterQuiz, setPendingBotAfterQuiz] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const gameEndedRef = useRef(false);

  function consumeSkill(skill: Skill) {
    setSkills((current) => {
      const index = current.indexOf(skill);
      if (index === -1) {
        return current;
      }

      return current.filter((_, itemIndex) => itemIndex !== index);
    });
  }

  function finishGame(nextBoard: Board, moves: number, nextCorrect = correctAnswers, nextWrong = wrongAnswers) {
    if (gameEndedRef.current) {
      return;
    }

    const checked = checkWinner(nextBoard);
    const finalResult = checked.winner ? resultFromWinner(checked.winner) : "draw";
    const finalScore = calculateScore({
      result: finalResult,
      correctAnswers: nextCorrect,
      wrongAnswers: nextWrong,
      totalMoves: moves,
    });

    gameEndedRef.current = true;
    setBoard(nextBoard);
    setWinnerState(checked);
    setResult(finalResult);
    setTurn("ended");
    setScore(finalScore);
    setSubmitStatus("Đang gửi điểm...");

    void submitScore({
      player_name: playerName,
      score: finalScore,
      result: finalResult,
      correct_answers: nextCorrect,
      wrong_answers: nextWrong,
      total_moves: moves,
    }).then(({ error }) => {
      setSubmitStatus(error ? error : "Đã cập nhật leaderboard");
    });
  }

  function runBotTurn(startBoard: Board, movesBeforeBot: number, forceEnhanced = false) {
    if (gameEndedRef.current) {
      return;
    }

    setTurn("bot");

    window.setTimeout(() => {
      if (gameEndedRef.current) {
        return;
      }

      if (skipBotNext) {
        setSkipBotNext(false);
        setEnhancedBotNext(false);
        setTurn("player");
        return;
      }

      const botMove = makeBotMove(startBoard, { enhanced: forceEnhanced || enhancedBotNext });
      if (!botMove) {
        finishGame(startBoard, movesBeforeBot);
        return;
      }

      const nextBoard = cloneBoard(startBoard);
      nextBoard[botMove.row][botMove.col] = "O";
      const nextMoves = movesBeforeBot + 1;
      const checked = checkWinner(nextBoard);

      setBoard(nextBoard);
      setTotalMoves(nextMoves);
      setEnhancedBotNext(false);

      if (checked.winner || isBoardFull(nextBoard)) {
        finishGame(nextBoard, nextMoves);
        return;
      }

      setTurn("player");
    }, 450);
  }

  function maybeOpenQuiz(nextBoard: Board, nextPlayerMoveCount: number): boolean {
    const regularQuiz = shouldShowQuiz(nextPlayerMoveCount);
    const bonusQuiz = hasNearWinThreat(nextBoard, "X") || hasNearWinThreat(nextBoard, "O");

    if (!regularQuiz && !bonusQuiz) {
      return false;
    }

    const question = getRandomQuestion(askedQuestionIds);
    if (!question) {
      return false;
    }

    setCurrentQuestion(question);
    setAskedQuestionIds((ids) => [...ids, question.id]);
    setPendingBotAfterQuiz(true);
    return true;
  }

  function handleCellClick(row: number, col: number) {
    if (turn !== "player" || result || currentQuestion) {
      return;
    }

    if (removeMode) {
      if (board[row][col] !== "O") {
        return;
      }

      const nextBoard = cloneBoard(board);
      nextBoard[row][col] = null;
      setBoard(nextBoard);
      setRemoveMode(false);
      consumeSkill("removeBot");
      return;
    }

    if (board[row][col]) {
      return;
    }

    const nextBoard = cloneBoard(board);
    nextBoard[row][col] = "X";
    const nextPlayerMoves = playerMoveCount + 1;
    const nextMoves = totalMoves + 1;
    const checked = checkWinner(nextBoard);

    setHintMove(null);
    setBoard(nextBoard);
    setPlayerMoveCount(nextPlayerMoves);
    setTotalMoves(nextMoves);

    if (checked.winner || isBoardFull(nextBoard)) {
      finishGame(nextBoard, nextMoves);
      return;
    }

    if (maybeOpenQuiz(nextBoard, nextPlayerMoves)) {
      return;
    }

    runBotTurn(nextBoard, nextMoves);
  }

  function handleQuizResolve(correct: boolean) {
    const nextCorrect = correct ? correctAnswers + 1 : correctAnswers;
    const nextWrong = correct ? wrongAnswers : wrongAnswers + 1;

    setCorrectAnswers(nextCorrect);
    setWrongAnswers(nextWrong);
    setScore(Math.max(0, score + (correct ? 30 : -10)));
    setCurrentQuestion(null);

    if (correct) {
      setSkills((current) => [...current, pickRandomSkill()]);
    } else {
      setEnhancedBotNext(true);
    }

    if (pendingBotAfterQuiz) {
      setPendingBotAfterQuiz(false);
      runBotTurn(board, totalMoves, !correct);
    }
  }

  function activateSkill(skill: Skill) {
    if (turn !== "player" || result || currentQuestion) {
      return;
    }

    if (skill === "hint") {
      setHintMove(suggestPlayerMove(board));
      consumeSkill(skill);
      return;
    }

    if (skill === "skipBot") {
      setSkipBotNext(true);
      consumeSkill(skill);
      return;
    }

    setRemoveMode((current) => !current);
  }

  function resetGame() {
    gameEndedRef.current = false;
    setBoard(createEmptyBoard());
    setTurn("player");
    setWinnerState({ winner: null, line: [] });
    setResult(null);
    setScore(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setPlayerMoveCount(0);
    setTotalMoves(0);
    setSkills([]);
    setHintMove(null);
    setSkipBotNext(false);
    setEnhancedBotNext(false);
    setRemoveMode(false);
    setCurrentQuestion(null);
    setAskedQuestionIds([]);
    setPendingBotAfterQuiz(false);
    setSubmitStatus(null);
  }

  const turnLabel =
    turn === "ended" ? "Kết thúc" : turn === "bot" ? "Bot đang suy nghĩ..." : removeMode ? "Chọn quân O để xóa" : "Lượt của bạn";

  return (
    <main className="game-shell min-h-screen px-4 py-5">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[330px_1fr_330px]">
        <aside className="order-2 space-y-4 lg:order-1">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 shadow-xl shadow-cyan-950/20 backdrop-blur">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-200">Người chơi</p>
            <h1 className="mt-2 text-2xl font-black text-white">{playerName}</h1>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-cyan-300/10 p-4">
                <p className="text-xs text-slate-300">Điểm</p>
                <p className="text-3xl font-black text-cyan-100">{score}</p>
              </div>
              <div className="rounded-2xl bg-fuchsia-300/10 p-4">
                <p className="text-xs text-slate-300">Lượt</p>
                <p className="text-3xl font-black text-fuchsia-100">{totalMoves}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur">
            <h2 className="text-lg font-black text-white">Quiz</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-emerald-300/10 p-4">
                <p className="text-xs text-slate-300">Đúng</p>
                <p className="text-3xl font-black text-emerald-100">{correctAnswers}</p>
              </div>
              <div className="rounded-2xl bg-rose-300/10 p-4">
                <p className="text-xs text-slate-300">Sai</p>
                <p className="text-3xl font-black text-rose-100">{wrongAnswers}</p>
              </div>
            </div>
          </div>
        </aside>

        <section className="order-1 rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-fuchsia-950/20 backdrop-blur lg:order-2">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Caro Quiz Battle</p>
              <h2 className="mt-1 text-2xl font-black text-white">{turnLabel}</h2>
            </div>
            <div className="flex gap-2">
              <button
                className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-bold text-white transition hover:border-cyan-300 hover:bg-cyan-300/10"
                onClick={resetGame}
                type="button"
              >
                Chơi lại
              </button>
              <Link
                className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/15"
                href="/leaderboard"
              >
                Leaderboard
              </Link>
            </div>
          </div>

          <GameBoard
            board={board}
            disabled={turn !== "player" || Boolean(result) || Boolean(currentQuestion)}
            hintMove={hintMove}
            onCellClick={handleCellClick}
            removeMode={removeMode}
            winnerState={winnerState}
          />

          {result ? (
            <div className="mt-5 rounded-[1.5rem] border border-yellow-300/30 bg-yellow-300/10 p-5 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-yellow-100">Kết quả cuối trận</p>
              <h3 className="mt-2 text-4xl font-black text-white">{getResultLabel(result)}</h3>
              <p className="mt-2 text-slate-200">Tổng điểm: {score}</p>
              {submitStatus ? <p className="mt-2 text-sm text-cyan-100">{submitStatus}</p> : null}
            </div>
          ) : null}
        </section>

        <aside className="order-3 space-y-4">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur">
            <h2 className="text-lg font-black text-white">Kỹ năng đang có</h2>
            <div className="mt-4 space-y-3">
              {skills.length === 0 ? (
                <p className="rounded-2xl bg-white/[0.05] p-4 text-sm text-slate-300">
                  Trả lời đúng câu hỏi để nhận kỹ năng.
                </p>
              ) : (
                skills.map((skill, index) => (
                  <button
                    className="w-full rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-left text-sm font-bold text-cyan-50 transition hover:bg-cyan-300/20"
                    key={`${skill}-${index}`}
                    onClick={() => activateSkill(skill)}
                    type="button"
                  >
                    {SKILL_LABELS[skill]}
                  </button>
                ))
              )}
            </div>
            {skipBotNext ? (
              <p className="mt-3 rounded-2xl bg-emerald-300/10 p-3 text-sm font-semibold text-emerald-100">
                Bot sẽ bị khóa ở lượt kế tiếp.
              </p>
            ) : null}
            {removeMode ? (
              <p className="mt-3 rounded-2xl bg-amber-300/10 p-3 text-sm font-semibold text-amber-100">
                Chạm vào một quân O để xóa.
              </p>
            ) : null}
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-5 text-sm leading-6 text-slate-300 backdrop-blur">
            <h2 className="mb-3 text-lg font-black text-white">Luật nhanh</h2>
            <p>Người chơi là X, bot là O. Ai có 5 quân liên tiếp theo ngang, dọc hoặc chéo sẽ thắng.</p>
            <p className="mt-3">Sau mỗi 3 lượt của bạn, game mở quiz. Đúng +30 điểm, sai -10 điểm.</p>
          </div>
        </aside>
      </div>

      <QuizModal onResolve={handleQuizResolve} question={currentQuestion} />
    </main>
  );
}
