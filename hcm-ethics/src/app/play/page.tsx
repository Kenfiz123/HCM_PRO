"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import GameBoard from "@/components/GameBoard";
import Leaderboard from "@/components/Leaderboard";
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
  shouldShowQuiz,
  WinnerState,
} from "@/lib/gameLogic";
import { getResultLabel } from "@/lib/scoring";
import { submitScore } from "@/lib/supabaseClient";

type Turn = "player" | "bot" | "round-end";
type CardTone = "emerald" | "cyan" | "fuchsia" | "amber" | "rose" | "slate";
type ScoreCardKind = "gain" | "steal" | "double" | "reduce" | "split" | "lose" | "gamble";

type ScoreCard = {
  id: string;
  title: string;
  badge: string;
  description: string;
  kind: ScoreCardKind;
  tone: CardTone;
  value?: number;
};

const CARD_BACKGROUNDS: Record<CardTone, string> = {
  emerald: "border-emerald-300/40 bg-emerald-300/15 hover:bg-emerald-300/25",
  cyan: "border-cyan-300/40 bg-cyan-300/15 hover:bg-cyan-300/25",
  fuchsia: "border-fuchsia-300/40 bg-fuchsia-300/15 hover:bg-fuchsia-300/25",
  amber: "border-amber-300/40 bg-amber-300/15 hover:bg-amber-300/25",
  rose: "border-rose-300/40 bg-rose-300/15 hover:bg-rose-300/25",
  slate: "border-slate-300/30 bg-slate-300/10 hover:bg-slate-300/20",
};

function resultFromWinner(winner: "X" | "O" | null): GameResult {
  if (winner === "X") {
    return "win";
  }

  if (winner === "O") {
    return "lose";
  }

  return "draw";
}

function getRoundBonus(result: GameResult, totalMoves: number): number {
  const resultBonus = result === "win" ? 100 : result === "draw" ? 50 : 20;
  const speedBonus = result === "win" && totalMoves < 15 ? 50 : 0;
  return resultBonus + speedBonus;
}

function makeCardDeck(): ScoreCard[] {
  const gambleValue = Math.random() > 0.42 ? 180 : -140;

  return [
    {
      id: "gain-120",
      title: "Tăng điểm",
      badge: "+120",
      description: "Cộng ngay 120 điểm vào quỹ hiện tại.",
      kind: "gain",
      tone: "emerald",
      value: 120,
    },
    {
      id: "gain-60",
      title: "Điểm nhanh",
      badge: "+60",
      description: "Nhận 60 điểm an toàn.",
      kind: "gain",
      tone: "cyan",
      value: 60,
    },
    {
      id: "steal",
      title: "Cướp điểm",
      badge: "+25%",
      description: "Cướp điểm từ bot: cộng 25% quỹ điểm hiện tại.",
      kind: "steal",
      tone: "fuchsia",
    },
    {
      id: "double",
      title: "Nhân đôi",
      badge: "x2",
      description: "Nhân đôi toàn bộ quỹ điểm hiện tại.",
      kind: "double",
      tone: "amber",
    },
    {
      id: "reduce",
      title: "Giảm điểm",
      badge: "-80",
      description: "Mất 80 điểm nếu chọn lá này.",
      kind: "reduce",
      tone: "rose",
      value: 80,
    },
    {
      id: "split",
      title: "Chia điểm",
      badge: "/2",
      description: "Quỹ điểm bị chia đôi.",
      kind: "split",
      tone: "slate",
    },
    {
      id: "lose",
      title: "Mất điểm",
      badge: "-150",
      description: "Mất 150 điểm khỏi quỹ hiện tại.",
      kind: "lose",
      tone: "rose",
      value: 150,
    },
    {
      id: `gamble-${gambleValue}`,
      title: "Lật kèo",
      badge: gambleValue > 0 ? `+${gambleValue}` : `${gambleValue}`,
      description: gambleValue > 0 ? "Bài may mắn: cộng điểm lớn." : "Bài rủi ro: mất điểm lớn.",
      kind: "gamble",
      tone: gambleValue > 0 ? "emerald" : "rose",
      value: gambleValue,
    },
  ];
}

function getRandomCards(): ScoreCard[] {
  return makeCardDeck()
    .map((card) => ({ card, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, 3)
    .map(({ card }) => card);
}

function applyCardEffect(currentScore: number, card: ScoreCard): { nextScore: number; message: string } {
  if (card.kind === "gain") {
    return {
      nextScore: currentScore + (card.value ?? 0),
      message: `${card.title}: cộng ${card.value ?? 0} điểm.`,
    };
  }

  if (card.kind === "steal") {
    const stolen = Math.max(80, Math.round(currentScore * 0.25));
    return {
      nextScore: currentScore + stolen,
      message: `Cướp điểm thành công: +${stolen} điểm.`,
    };
  }

  if (card.kind === "double") {
    return {
      nextScore: currentScore * 2,
      message: "Nhân đôi quỹ điểm hiện tại.",
    };
  }

  if (card.kind === "split") {
    return {
      nextScore: Math.floor(currentScore / 2),
      message: "Quỹ điểm bị chia đôi.",
    };
  }

  const delta = card.kind === "gamble" ? (card.value ?? 0) : -(card.value ?? 0);
  return {
    nextScore: currentScore + delta,
    message: delta >= 0 ? `${card.title}: +${delta} điểm.` : `${card.title}: ${delta} điểm.`,
  };
}

export default function PlayPage() {
  const [playerName] = useState(() =>
    typeof window === "undefined" ? "Khách mời" : localStorage.getItem("caro-player-name") || "Khách mời",
  );
  const [board, setBoard] = useState<Board>(() => createEmptyBoard());
  const [turn, setTurn] = useState<Turn>("player");
  const [winnerState, setWinnerState] = useState<WinnerState>({ winner: null, line: [] });
  const [roundResult, setRoundResult] = useState<GameResult | null>(null);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [playerMoveCount, setPlayerMoveCount] = useState(0);
  const [totalMoves, setTotalMoves] = useState(0);
  const [enhancedBotNext, setEnhancedBotNext] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [cardChoices, setCardChoices] = useState<ScoreCard[] | null>(null);
  const [cardMessage, setCardMessage] = useState<string | null>(null);
  const [askedQuestionIds, setAskedQuestionIds] = useState<string[]>([]);
  const [pendingBotAfterQuiz, setPendingBotAfterQuiz] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const scoreRef = useRef(0);
  const roundEndingRef = useRef(false);
  const nextRoundTimerRef = useRef<number | null>(null);

  function updateScore(updater: (currentScore: number) => number) {
    setScore((currentScore) => {
      const nextScore = Math.max(0, Math.floor(updater(currentScore)));
      scoreRef.current = nextScore;
      return nextScore;
    });
  }

  function clearNextRoundTimer() {
    if (nextRoundTimerRef.current) {
      window.clearTimeout(nextRoundTimerRef.current);
      nextRoundTimerRef.current = null;
    }
  }

  function startNextRound() {
    roundEndingRef.current = false;
    setBoard(createEmptyBoard());
    setTurn("player");
    setWinnerState({ winner: null, line: [] });
    setRoundResult(null);
    setPlayerMoveCount(0);
    setTotalMoves(0);
    setEnhancedBotNext(false);
    setCurrentQuestion(null);
    setCardChoices(null);
    setPendingBotAfterQuiz(false);
    setSubmitStatus(null);
  }

  function finishRound(nextBoard: Board, moves: number, nextCorrect = correctAnswers, nextWrong = wrongAnswers) {
    if (roundEndingRef.current) {
      return;
    }

    const checked = checkWinner(nextBoard);
    const finalResult = checked.winner ? resultFromWinner(checked.winner) : "draw";
    const roundBonus = getRoundBonus(finalResult, moves);
    const finalScore = Math.max(0, scoreRef.current + roundBonus);
    scoreRef.current = finalScore;

    roundEndingRef.current = true;
    setBoard(nextBoard);
    setWinnerState(checked);
    setRoundResult(finalResult);
    setTurn("round-end");
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
      setSubmitStatus(error ? error : "Đã cập nhật leaderboard realtime");
    });

    clearNextRoundTimer();
    nextRoundTimerRef.current = window.setTimeout(() => {
      startNextRound();
    }, 1800);
  }

  function runBotTurn(startBoard: Board, movesBeforeBot: number, forceEnhanced = false) {
    if (roundEndingRef.current) {
      return;
    }

    setTurn("bot");

    window.setTimeout(() => {
      if (roundEndingRef.current) {
        return;
      }

      const botMove = makeBotMove(startBoard, { enhanced: forceEnhanced || enhancedBotNext });
      if (!botMove) {
        finishRound(startBoard, movesBeforeBot);
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
        finishRound(nextBoard, nextMoves);
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
    if (turn !== "player" || roundResult || currentQuestion || cardChoices || board[row][col]) {
      return;
    }

    const nextBoard = cloneBoard(board);
    nextBoard[row][col] = "X";
    const nextPlayerMoves = playerMoveCount + 1;
    const nextMoves = totalMoves + 1;
    const checked = checkWinner(nextBoard);

    setCardMessage(null);
    setBoard(nextBoard);
    setPlayerMoveCount(nextPlayerMoves);
    setTotalMoves(nextMoves);

    if (checked.winner || isBoardFull(nextBoard)) {
      finishRound(nextBoard, nextMoves);
      return;
    }

    if (maybeOpenQuiz(nextBoard, nextPlayerMoves)) {
      return;
    }

    runBotTurn(nextBoard, nextMoves);
  }

  function resumeAfterQuiz(forceEnhancedBot: boolean) {
    if (pendingBotAfterQuiz) {
      setPendingBotAfterQuiz(false);
      runBotTurn(board, totalMoves, forceEnhancedBot);
    }
  }

  function handleQuizResolve(correct: boolean) {
    const nextCorrect = correct ? correctAnswers + 1 : correctAnswers;
    const nextWrong = correct ? wrongAnswers : wrongAnswers + 1;

    setCorrectAnswers(nextCorrect);
    setWrongAnswers(nextWrong);
    setCurrentQuestion(null);

    if (correct) {
      updateScore((currentScore) => currentScore + 30);
      setCardMessage("Trả lời đúng: +30 điểm. Chọn 1 trong 3 lá bài để nhận hiệu ứng.");
      setCardChoices(getRandomCards());
      return;
    }

    updateScore((currentScore) => currentScore * 0.5);
    setCardMessage("Trả lời sai: mất 50% quỹ điểm hiện tại. Bot sẽ mạnh hơn ở lượt kế tiếp.");
    setEnhancedBotNext(true);
    resumeAfterQuiz(true);
  }

  function chooseCard(card: ScoreCard) {
    const effect = applyCardEffect(scoreRef.current, card);
    setCardMessage(effect.message);
    updateScore(() => effect.nextScore);
    setCardChoices(null);
    resumeAfterQuiz(false);
  }

  function resetGame() {
    clearNextRoundTimer();
    scoreRef.current = 0;
    roundEndingRef.current = false;
    setBoard(createEmptyBoard());
    setTurn("player");
    setWinnerState({ winner: null, line: [] });
    setRoundResult(null);
    setScore(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setPlayerMoveCount(0);
    setTotalMoves(0);
    setEnhancedBotNext(false);
    setCurrentQuestion(null);
    setCardChoices(null);
    setCardMessage(null);
    setAskedQuestionIds([]);
    setPendingBotAfterQuiz(false);
    setSubmitStatus(null);
  }

  const turnLabel =
    turn === "round-end"
      ? "Ván mới sắp bắt đầu"
      : turn === "bot"
        ? "Bot đang suy nghĩ..."
        : "Lượt của bạn";

  return (
    <main className="game-shell min-h-screen px-4 py-5">
      <div className="mx-auto grid max-w-[1560px] gap-5 xl:grid-cols-[330px_1fr_390px]">
        <aside className="order-2 space-y-4 xl:order-1">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 shadow-xl shadow-cyan-950/20 backdrop-blur">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-200">Người chơi</p>
            <h1 className="mt-2 text-2xl font-black text-white">{playerName}</h1>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-cyan-300/10 p-4">
                <p className="text-xs text-slate-300">Điểm</p>
                <p className="text-3xl font-black text-cyan-100">{score}</p>
              </div>
              <div className="rounded-2xl bg-fuchsia-300/10 p-4">
                <p className="text-xs text-slate-300">Lượt ván này</p>
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

          {cardMessage ? (
            <div className="rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/10 p-5 text-sm font-semibold leading-6 text-cyan-50 backdrop-blur">
              {cardMessage}
            </div>
          ) : null}
        </aside>

        <section className="order-1 rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-fuchsia-950/20 backdrop-blur xl:order-2">
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
                Chơi lại từ 0
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
            disabled={turn !== "player" || Boolean(roundResult) || Boolean(currentQuestion) || Boolean(cardChoices)}
            onCellClick={handleCellClick}
            winnerState={winnerState}
          />

          {roundResult ? (
            <div className="mt-5 rounded-[1.5rem] border border-yellow-300/30 bg-yellow-300/10 p-5 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-yellow-100">Kết quả ván</p>
              <h3 className="mt-2 text-4xl font-black text-white">{getResultLabel(roundResult)}</h3>
              <p className="mt-2 text-slate-200">
                +{getRoundBonus(roundResult, totalMoves)} điểm thưởng. Ván mới sẽ tự bắt đầu, điểm tiếp tục cộng dồn.
              </p>
              {submitStatus ? <p className="mt-2 text-sm text-cyan-100">{submitStatus}</p> : null}
            </div>
          ) : null}
        </section>

        <aside className="order-3 space-y-4">
          <Leaderboard captureEnabled compact limit={5} />

          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-5 text-sm leading-6 text-slate-300 backdrop-blur">
            <h2 className="mb-3 text-lg font-black text-white">Luật nhanh</h2>
            <p>Người chơi là X, bot là O. Ai có 5 quân liên tiếp theo ngang, dọc hoặc chéo sẽ thắng.</p>
            <p className="mt-3">Sau mỗi 3 lượt của bạn, game mở quiz. Đúng: +30 điểm và chọn 1 lá bài. Sai: mất 50% điểm.</p>
            <p className="mt-3">Thắng ván sẽ cộng thưởng và tự sang ván mới, điểm không bị reset.</p>
          </div>
        </aside>
      </div>

      {cardChoices ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-4xl rounded-[1.75rem] border border-white/10 bg-slate-950 p-5 text-white shadow-2xl shadow-fuchsia-900/30">
            <div className="mb-5 text-center">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-200">Chọn phần thưởng</p>
              <h2 className="mt-2 text-3xl font-black">Chọn 1 trong 3 lá bài</h2>
              <p className="mt-2 text-sm text-slate-300">Có lá tăng điểm, có lá rủi ro. Chọn xong game sẽ tiếp tục.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {cardChoices.map((card) => (
                <button
                  className={`min-h-56 rounded-[1.5rem] border p-5 text-left transition hover:-translate-y-1 ${CARD_BACKGROUNDS[card.tone]}`}
                  key={card.id}
                  onClick={() => chooseCard(card)}
                  type="button"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
                      Lá bài
                    </span>
                    <span className="rounded-full bg-slate-950/40 px-3 py-1 text-lg font-black text-white">{card.badge}</span>
                  </div>
                  <h3 className="mt-8 text-2xl font-black text-white">{card.title}</h3>
                  <p className="mt-4 text-sm font-semibold leading-6 text-slate-100">{card.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <QuizModal onResolve={handleQuizResolve} question={currentQuestion} />
    </main>
  );
}
