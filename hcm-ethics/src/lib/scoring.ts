import { GameResult } from "@/lib/gameLogic";

export type ScoreInput = {
  result: GameResult;
  correctAnswers: number;
  wrongAnswers: number;
  totalMoves: number;
};

export function calculateScore(input: ScoreInput): number {
  const resultScore = input.result === "win" ? 100 : input.result === "draw" ? 50 : 20;
  const quizScore = input.correctAnswers * 30 - input.wrongAnswers * 10;
  const speedBonus = input.result === "win" && input.totalMoves < 15 ? 50 : 0;

  return Math.max(0, resultScore + quizScore + speedBonus);
}

export function getResultLabel(result: GameResult): string {
  if (result === "win") {
    return "Thắng";
  }

  if (result === "lose") {
    return "Thua";
  }

  return "Hòa";
}
