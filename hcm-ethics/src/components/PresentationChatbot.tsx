"use client";

import { FormEvent, useState } from "react";

type ChatMessage = {
  content: string;
  id: string;
  role: "assistant" | "user";
};

type ChatResponse = {
  answer?: string;
  error?: string;
  source?: "ai" | "local";
};

const openingMessage: ChatMessage = {
  content: "Mình trả lời trực tiếp, đúng trọng tâm và rõ ý theo câu hỏi của bạn.",
  id: "opening",
  role: "assistant",
};

export default function PresentationChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([openingMessage]);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function submitQuestion(rawQuestion: string) {
    const trimmedQuestion = rawQuestion.trim();

    if (!trimmedQuestion || isLoading) {
      return;
    }

    if (trimmedQuestion.length > 1000) {
      setError("Câu hỏi quá dài. Hãy rút gọn dưới 1000 ký tự.");
      return;
    }

    const userMessage: ChatMessage = {
      content: trimmedQuestion,
      id: createMessageId("user"),
      role: "user",
    };

    setQuestion("");
    setError("");
    setIsLoading(true);
    setMessages((currentMessages) => [...currentMessages, userMessage]);

    try {
      const response = await fetch("/api/presentation-chat", {
        body: JSON.stringify({ question: trimmedQuestion }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const data = (await response.json()) as ChatResponse;

      if (!response.ok || !data.answer) {
        throw new Error(data.error || "Không nhận được câu trả lời.");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          content: data.answer ?? "",
          id: createMessageId("assistant"),
          role: "assistant",
        },
      ]);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Không thể kết nối chatbot.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitQuestion(question);
  }

  return (
    <>
      {isOpen ? (
        <section
          aria-label="Chatbot AI thuyết trình"
          className="fixed bottom-24 right-4 z-[70] flex min-h-[min(72vh,680px)] max-h-[min(86vh,760px)] w-[calc(100vw-2rem)] max-w-[560px] flex-col overflow-hidden rounded-3xl border border-[#ffd700]/35 bg-[#1a0a00]/95 text-white shadow-2xl shadow-black/40 backdrop-blur"
        >
          <header className="flex items-center justify-between gap-3 border-b border-white/10 bg-gradient-to-r from-[#8b0000] to-[#c8102e] px-5 py-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#fff0a0]">AI Chatbot</p>
              <h2 className="text-xl font-black">Hỏi đáp trọng tâm</h2>
            </div>
            <button
              aria-label="Đóng chatbot AI"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg font-black transition hover:bg-white/20"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              x
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div
                className={`max-w-[90%] rounded-2xl px-4 py-3 text-base leading-7 ${
                  message.role === "user"
                    ? "ml-auto bg-[#ffd700] font-semibold text-[#5b1200]"
                    : "border border-white/10 bg-white/10 text-white/90"
                }`}
                key={message.id}
              >
                <p>{message.content}</p>
              </div>
            ))}

            {isLoading ? (
              <div className="inline-flex rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/75">
                Đang trả lời...
              </div>
            ) : null}
          </div>

          <div className="border-t border-white/10 px-4 py-4">
            <form className="flex gap-2" onSubmit={handleSubmit}>
              <input
                className="min-w-0 flex-1 rounded-2xl border border-white/15 bg-white px-4 py-3 text-sm font-semibold text-[#1a0a00] outline-none transition placeholder:text-[#7c5f4c] focus:border-[#ffd700] focus:ring-4 focus:ring-[#ffd700]/25"
                maxLength={1000}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Nhập câu hỏi..."
                value={question}
              />
              <button
                className="rounded-2xl bg-[#ffd700] px-5 py-3 text-sm font-black text-[#8b0000] transition hover:bg-[#fff0a0] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isLoading || !question.trim()}
                type="submit"
              >
                Gửi
              </button>
            </form>
            {error ? <p className="mt-2 text-sm font-semibold text-[#ffb4a8]">{error}</p> : null}
          </div>
        </section>
      ) : null}

      <button
        aria-label={isOpen ? "Đóng chatbot AI" : "Mở chatbot AI"}
        className="fixed bottom-5 right-4 z-[70] flex h-16 w-16 items-center justify-center rounded-full border border-[#ffd700]/45 bg-gradient-to-br from-[#ffd700] to-[#f59e0b] text-lg font-black text-[#8b0000] shadow-2xl shadow-black/35 transition hover:scale-105"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        type="button"
      >
        AI
      </button>
    </>
  );
}

function createMessageId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
