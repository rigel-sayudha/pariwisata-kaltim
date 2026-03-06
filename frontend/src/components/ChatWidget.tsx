"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, CheckCircle, ChevronDown, Minimize2, Bot } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

function generateSessionToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

type Message = {
    from: "user" | "admin" | "system";
    text: string;
    time: string;
};

type WidgetState = "closed" | "open" | "minimized";

const now = () =>
    new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit" }).format(new Date());

export default function ChatWidget() {
    const [widgetState, setWidgetState] = useState<WidgetState>("closed");
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");

    const [name, setName] = useState("");
    const [step, setStep] = useState<"name" | "chat">("name");
    const [sending, setSending] = useState(false);
    const [sessionToken] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("chat_session_token");
            if (stored) return stored;
            const token = generateSessionToken();
            localStorage.setItem("chat_session_token", token);
            return token;
        }
        return generateSessionToken();
    });
    const [pulse, setPulse] = useState(true);
    const [hasUnread, setHasUnread] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const t = setTimeout(() => setPulse(false), 8000);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const pollReply = useCallback(async () => {
        try {
            const res = await fetch(`${API}/api/chat-reply/${sessionToken}`);
            const data = await res.json();
            if (data.reply) {
                setMessages((prev) => {
                    const alreadyAdded = prev.some(
                        (m) => m.from === "admin" && m.text === data.reply
                    );
                    if (alreadyAdded) return prev;
                    if (widgetState !== "open") setHasUnread(true);
                    return [
                        ...prev,
                        { from: "admin", text: data.reply, time: now() },
                    ];
                });
            }
        } catch { }
    }, [sessionToken, widgetState]);

    useEffect(() => {
        if (step === "chat" && messages.some((m) => m.from === "user")) {
            pollRef.current = setInterval(pollReply, 8000);
        }
        return () => {
            if (pollRef.current) clearInterval(pollRef.current);
        };
    }, [step, messages, pollReply]);

    const open = () => {
        setWidgetState("open");
        setHasUnread(false);
        if (messages.length === 0 && step === "chat") {
            setMessages([
                {
                    from: "system",
                    text: "👋 Halo! Kami siap membantu Anda.",
                    time: now(),
                },
            ]);
        }
    };

    const handleStartChat = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        setStep("chat");
        setMessages([
            {
                from: "system",
                text: `👋 Halo, ${name}! Ada yang bisa kami bantu hari ini?`,
                time: now(),
            },
        ]);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || sending) return;
        const text = inputText.trim();
        setInputText("");
        const userMsg: Message = { from: "user", text, time: now() };
        setMessages((prev) => [...prev, userMsg]);
        setSending(true);

        try {
            await fetch(`${API}/api/contact-messages`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    name,
                    email: "chat@kaltimexplore.id",
                    subject: "Pesan Chat",
                    message: text,
                    session_token: sessionToken,
                }),
            });
            setMessages((prev) => [
                ...prev,
                { from: "admin", text: "✅ Pesan diterima! Kami akan segera membalas.", time: now() },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { from: "system", text: "❌ Gagal mengirim. Coba lagi.", time: now() },
            ]);
        } finally {
            setSending(false);
        }
    };

    return (
        <>
            {/* Chat Panel */}
            <div
                className={`fixed z-50 transition-all duration-300 ease-out
                    bottom-24 right-4 left-4 sm:left-auto sm:right-6 sm:w-[360px]
                    ${widgetState === "open" ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"}`}
            >
                <div className="flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-white/10 bg-white dark:bg-slate-900"
                    style={{ maxHeight: "min(560px, calc(100vh - 120px))" }}>

                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-white text-sm border border-white/30">
                                    K
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm leading-tight">KaltimExplore</p>
                                <p className="text-emerald-100 text-xs">● Online sekarang</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setWidgetState("minimized")}
                                className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                                aria-label="Minimize"
                            >
                                <Minimize2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={() => setWidgetState("closed")}
                                className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Step: Enter Name */}
                    {step === "name" ? (
                        <form onSubmit={handleStartChat} className="flex flex-col gap-4 p-5 flex-1">
                            {/* Bot greeting bubble */}
                            <div className="flex items-start gap-2">
                                <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center flex-shrink-0 mt-1">
                                    <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                    Halo! 👋 Selamat datang di KaltimExplore.<br />
                                    Boleh saya tahu nama Anda?
                                </div>
                            </div>
                            <input
                                type="text"
                                required
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nama Anda..."
                                className="px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            />
                            <button
                                type="submit"
                                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
                            >
                                Mulai Chat →
                            </button>
                        </form>
                    ) : (
                        <>
                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3 overscroll-contain">
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} items-end gap-2`}>
                                        {msg.from !== "user" && (
                                            <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center flex-shrink-0">
                                                <Bot className="w-3.5 h-3.5 text-emerald-600" />
                                            </div>
                                        )}
                                        <div className={`flex flex-col gap-0.5 max-w-[78%]`}>
                                            <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.from === "user"
                                                    ? "bg-emerald-600 text-white rounded-br-sm"
                                                    : msg.from === "system"
                                                        ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 italic text-xs"
                                                        : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm"
                                                }`}>
                                                {msg.text}
                                            </div>
                                            <span className={`text-[10px] text-slate-400 px-1 ${msg.from === "user" ? "text-right" : "text-left"}`}>
                                                {msg.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {sending && (
                                    <div className="flex items-end gap-2">
                                        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                                            <Bot className="w-3.5 h-3.5 text-emerald-600" />
                                        </div>
                                        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-sm px-4 py-3">
                                            <span className="flex gap-1 items-center">
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <form
                                onSubmit={handleSend}
                                className="flex items-center gap-2 px-3 py-3 border-t border-slate-100 dark:border-slate-800 flex-shrink-0 bg-white dark:bg-slate-900"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Ketik pesan..."
                                    className="flex-1 px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputText.trim() || sending}
                                    className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
                                >
                                    <Send className="w-4 h-4 text-white disabled:text-slate-400" />
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>

            {/* Floating Button */}
            <button
                onClick={() => widgetState === "open" ? setWidgetState("closed") : open()}
                aria-label="Chat dengan Admin"
                className={`fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${widgetState === "open"
                        ? "bg-slate-700 hover:bg-slate-600 rotate-180"
                        : "bg-emerald-600 hover:bg-emerald-500 rotate-0"
                    }`}
                style={{ boxShadow: "0 8px 32px rgba(5, 150, 105, 0.4)" }}
            >
                {pulse && widgetState === "closed" && (
                    <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-50" />
                )}
                {hasUnread && widgetState !== "open" && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white z-10" />
                )}
                {widgetState === "open" ? (
                    <ChevronDown className="w-6 h-6 text-white" />
                ) : (
                    <MessageCircle className="w-6 h-6 text-white" />
                )}
            </button>
        </>
    );
}
