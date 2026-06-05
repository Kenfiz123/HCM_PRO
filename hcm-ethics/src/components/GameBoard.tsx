"use client";

import { Board, Move, WinnerState } from "@/lib/gameLogic";

type GameBoardProps = {
  board: Board;
  disabled?: boolean;
  hintMove?: Move | null;
  removeMode?: boolean;
  frozen?: boolean;
  freezeLabel?: string;
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
  frozen = false,
  freezeLabel = "Sàn đang bị đóng băng",
  winnerState,
  onCellClick,
}: GameBoardProps) {
  return (
    <div className="board-wrap relative mx-auto w-full max-w-[min(94vw,760px)]">
      <div
        className="game-board grid w-full gap-0.5 rounded-[1.5rem] border border-white/15 bg-slate-950/70 p-2 shadow-2xl shadow-fuchsia-900/20 backdrop-blur"
        style={{ gridTemplateColumns: `repeat(${board.length}, minmax(0, 1fr))` }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isHint = sameMove(hintMove, rowIndex, colIndex);
            const isWinner = winnerState?.line.some((move) => sameMove(move, rowIndex, colIndex));
            const canRemove = removeMode && cell === "O";

            return (
              <button
                aria-label={`Ô ${rowIndex + 1}-${colIndex + 1}`}
                className={[
                  "board-cell aspect-square rounded-md border text-[clamp(0.78rem,3.2vw,1.7rem)] font-black leading-none transition duration-200",
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
      {frozen ? (
        <div className="frost-overlay absolute inset-0 flex items-center justify-center rounded-[1.5rem] border border-cyan-200/40 bg-slate-950/55 text-center text-xl font-black text-cyan-100 shadow-inner backdrop-blur-sm">
          {freezeLabel}
        </div>
      ) : null}
    </div>
  );
}
