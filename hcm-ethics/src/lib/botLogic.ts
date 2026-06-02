import {
  adjacencyScore,
  Board,
  checkWinner,
  cloneBoard,
  getAvailableMoves,
  getLineScore,
  Move,
} from "@/lib/gameLogic";

type BotOptions = {
  enhanced?: boolean;
};

function findImmediateMove(board: Board, mark: "X" | "O"): Move | null {
  for (const move of getAvailableMoves(board)) {
    const next = cloneBoard(board);
    next[move.row][move.col] = mark;
    if (checkWinner(next).winner === mark) {
      return move;
    }
  }

  return null;
}

function scoreBotMove(board: Board, move: Move, enhanced: boolean): number {
  const botBoard = cloneBoard(board);
  botBoard[move.row][move.col] = "O";

  const playerBoard = cloneBoard(board);
  playerBoard[move.row][move.col] = "X";

  return (
    getLineScore(botBoard, move, "O") * (enhanced ? 5 : 4) +
    getLineScore(playerBoard, move, "X") * (enhanced ? 4 : 2) +
    adjacencyScore(board, move)
  );
}

export function makeBotMove(board: Board, options: BotOptions = {}): Move | null {
  const available = getAvailableMoves(board);
  if (available.length === 0) {
    return null;
  }

  const winningMove = findImmediateMove(board, "O");
  if (winningMove) {
    return winningMove;
  }

  const blockingMove = findImmediateMove(board, "X");
  if (blockingMove) {
    return blockingMove;
  }

  const enhanced = Boolean(options.enhanced);
  const scored = available.map((move) => ({
    move,
    score: scoreBotMove(board, move, enhanced),
  }));

  scored.sort((a, b) => b.score - a.score);
  const topScore = scored[0]?.score ?? 0;
  const bestMoves = scored.filter((item) => item.score >= topScore - (enhanced ? 2 : 6));

  return bestMoves[Math.floor(Math.random() * bestMoves.length)]?.move ?? available[0];
}
