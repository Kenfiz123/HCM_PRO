"use client";

import { Board, Move, WinnerState } from "@/lib/gameLogic";

type GameBoardProps = {
  board: Board;
  disabled?: boolean;
  hintMove?: Move | null;
  removeMode?: boolean;
  winnerState?: WinnerState;
  onCellClick: (row: number, col: number) => void;
};

function sameMove(a: Move | null | undefined, row: number, col: number): boolean {
  return Boolean(a && a.row === row && a.col === col);
}

export default function GameBoard({
  board,
  disabled = false,
  hintMove,
  removeMode = false,
  winnerState,
  onCellClick,
}: GameBoardProps) {
  return (
    <div className="mx-auto grid w-full max-w-[min(92vw,520px)] grid-cols-9 gap-1 rounded-[1.5rem] border border-white/15 bg-slate-950/70 p-2 shadow-2xl shadow-fuchsia-900/20 backdrop-blur">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isHint = sameMove(hintMove, rowIndex, colIndex);
          const isWinner = winnerState?.line.some((move) => sameMove(move, rowIndex, colIndex));
          const canRemove = removeMode && cell === "O";

          return (
            <button
              aria-label={`Ô ${rowIndex + 1}-${colIndex + 1}`}
              className={[
                "aspect-square rounded-lg border text-[clamp(1rem,7vw,2rem)] font-black leading-none transition duration-200",
                "focus:outline-none focus:ring-2 focus:ring-cyan-300",
                cell === "X"
                  ? "border-cyan-300/60 bg-cyan-400/15 text-cyan-200 shadow-lg shadow-cyan-500/20"
                  : "",
                cell === "O"
                  ? "border-fuchsia-300/60 bg-fuchsia-400/15 text-fuchsia-200 shadow-lg shadow-fuchsia-500/20"
                  : "",
                !cell && !disabled
                  ? "border-white/10 bg-white/[0.06] text-white hover:scale-[1.04] hover:border-cyan-300/70 hover:bg-cyan-300/15"
                  : "border-white/10 bg-white/[0.04]",
                isHint ? "animate-pulse border-emerald-300 bg-emerald-300/25 ring-2 ring-emerald-300/70" : "",
                canRemove ? "border-amber-300 bg-amber-300/20 ring-2 ring-amber-300/70" : "",
                isWinner ? "border-yellow-200 bg-yellow-300/30 text-yellow-100 ring-2 ring-yellow-200" : "",
              ].join(" ")}
              disabled={disabled || (!canRemove && Boolean(cell))}
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onCellClick(rowIndex, colIndex)}
              type="button"
            >
              {cell ?? ""}
            </button>
          );
        }),
      )}
    </div>
  );
}
