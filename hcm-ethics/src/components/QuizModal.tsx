"use client";

import { useState } from "react";
import { QuizQuestion } from "@/data/questions";

type QuizModalProps = {
  question: QuizQuestion | null;
  onResolve: (correct: boolean) => void;
};

export default function QuizModal({ question, onResolve }: QuizModalProps) {
  const [answerState, setAnswerState] = useState<{ questionId: string; selectedIndex: number | null }>({
    questionId: "",
    selectedIndex: null,
  });

  if (!question) {
    return null;
  }

  const selectedIndex = answerState.questionId === question.id ? answerState.selectedIndex : null;
  const answered = selectedIndex !== null;
  const isCorrect = selectedIndex === question.correctAnswerIndex;

  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="quiz-modal modal-pop w-full max-w-lg overflow-hidden rounded-[1.5rem] border border-cyan-300/30 bg-slate-950 text-white shadow-2xl shadow-cyan-500/20">
        <div className="border-b border-white/10 bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-yellow-400/20 p-5">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-cyan-100">
              Quiz bonus
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
              {question.difficulty}
            </span>
          </div>
          <h2 className="text-xl font-black leading-snug text-white">{question.question}</h2>
        </div>

        <div className="space-y-3 p-5">
          {question.options.map((option, index) => {
            const isAnswer = index === question.correctAnswerIndex;
            const isSelected = index === selectedIndex;

            return (
              <button
                className={[
                  "quiz-option w-full rounded-2xl border p-4 text-left text-sm font-semibold transition",
                  "focus:outline-none focus:ring-2 focus:ring-cyan-300",
                  !answered
                    ? "border-white/10 bg-white/[0.06] hover:border-cyan-300/70 hover:bg-cyan-300/10"
                    : "",
                  answered && isAnswer ? "border-emerald-300 bg-emerald-400/20 text-emerald-50" : "",
                  answered && isSelected && !isAnswer
                    ? "border-rose-300 bg-rose-400/20 text-rose-50"
                    : "",
                  answered && !isAnswer && !isSelected ? "border-white/10 bg-white/[0.03] text-slate-400" : "",
                ].join(" ")}
                disabled={answered}
                key={option}
                onClick={() => setAnswerState({ questionId: question.id, selectedIndex: index })}
                type="button"
              >
                <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {answered ? (
          <div className="border-t border-white/10 p-5">
            <p className={isCorrect ? "font-semibold text-emerald-200" : "font-semibold text-rose-200"}>
              {isCorrect ? "Chính xác: +30 điểm và được chọn 1 trong 3 lá bài." : "Sai rồi: mất 50% điểm hiện tại, bot sẽ mạnh hơn lượt tới."}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{question.explanation}</p>
            <button
              className="energy-button mt-5 w-full rounded-2xl bg-cyan-300 px-5 py-3 font-black text-slate-950 transition hover:bg-cyan-200"
              onClick={() => onResolve(isCorrect)}
              type="button"
            >
              Tiếp tục trận đấu
            </button>
          </div>
        ) : (
          <div className="border-t border-white/10 px-5 py-4 text-sm text-slate-300">
            Trả lời đúng để mở 3 lá bài điểm số.
          </div>
        )}
      </div>
    </div>
  );
}
