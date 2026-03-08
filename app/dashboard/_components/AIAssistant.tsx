"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, Trash2, Bot } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

type Message = { role: "user" | "assistant"; content: string };

function getContext(pathname: string): string {
  if (pathname === "/dashboard" || pathname === "/dashboard/") return "dashboard";
  if (pathname.startsWith("/dashboard/new-proposal")) return "new-proposal";
  if (pathname.match(/\/dashboard\/proposals\/[^/]+/)) return "proposal-detail";
  if (pathname.startsWith("/dashboard/proposals")) return "proposals";
  if (pathname.startsWith("/dashboard/upgrade")) return "upgrade";
  return "dashboard";
}

export function AIAssistant() {
  const pathname = usePathname();
  const { t, lang } = useLanguage();
  const a = t.assistant;
  const context = getContext(pathname ?? "");

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasBounced, setHasBounced] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Attract attention once
  useEffect(() => {
    const t = setTimeout(() => setHasBounced(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isOpen]);

  const suggestions =
    (a.suggestions as Record<string, readonly string[]>)[context] ??
    (a.suggestions as Record<string, readonly string[]>)["dashboard"];

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          context,
          history: messages.slice(-6),
          lang,
        }),
      });

      const data = await res.json();
      const reply: string = res.ok
        ? data.reply
        : data.error ?? a.errorFallback;

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: a.errorFallback },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const showSuggestions = messages.length === 0;

  return (
    <>
      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-[340px] sm:w-[380px] flex flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-violet-100/60 overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 bg-violet-600 px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">{a.title}</span>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={() => setMessages([])}
                  className="p-1 rounded text-white/70 hover:text-white hover:bg-violet-500 transition-colors"
                  title={a.clearChat}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-white/70 hover:text-white hover:bg-violet-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 min-h-[280px] max-h-[360px] bg-gray-50">
            {/* Greeting */}
            <div className="flex gap-2 items-start">
              <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5 text-violet-600" />
              </div>
              <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 text-sm text-gray-700 shadow-sm border border-gray-100 max-w-[88%]">
                {a.greeting}
              </div>
            </div>

            {/* Suggested questions */}
            {showSuggestions && (
              <div className="pl-8 space-y-1.5">
                <p className="text-xs text-gray-400 font-medium">{a.suggestedLabel}</p>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    disabled={loading}
                    className="block w-full text-left text-xs text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-100 rounded-lg px-3 py-1.5 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Conversation */}
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div className="bg-violet-600 text-white rounded-xl rounded-tr-sm px-3 py-2 text-sm max-w-[88%] whitespace-pre-wrap">
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex gap-2 items-start">
                  <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-violet-600" />
                  </div>
                  <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 text-sm text-gray-700 shadow-sm border border-gray-100 max-w-[88%] whitespace-pre-wrap">
                    {m.content}
                  </div>
                </div>
              )
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-2 items-start">
                <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-violet-600" />
                </div>
                <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2.5 shadow-sm border border-gray-100">
                  <span className="flex gap-1">
                    {[0, 150, 300].map((d) => (
                      <span
                        key={d}
                        className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${d}ms` }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 bg-white px-3 py-2 flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={a.placeholder}
              rows={1}
              maxLength={600}
              disabled={loading}
              className="flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition max-h-[100px] disabled:opacity-60"
              style={{ lineHeight: "1.4" }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
              aria-label={a.send}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={`fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200 flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${
          hasBounced && !isOpen ? "animate-bounce-once" : ""
        }`}
        aria-label={a.title}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
        {!isOpen && messages.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white text-[9px] font-bold flex items-center justify-center">
            {messages.filter((m) => m.role === "assistant").length}
          </span>
        )}
      </button>
    </>
  );
}
