"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Phone,
  Video,
  Info,
  Smile,
  Paperclip,
  Mic,
  SendHorizontal,
  CheckCheck,
  FileText,
  Download,
  DownloadCloud,
  Eraser,
  Slash,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
} from "lucide-react";

const fetchInbox = async () => {
  const res = await fetch("/api/whatsapp/inbox", { cache: "no-store" });
  const data = await res.json();
  if (!res.ok) return { error: data?.error || "Gagal mengambil data" };
  if (!data?.items) return { error: "Format respons tidak sesuai" };
  return data;
};

const fetchMessages = async (jid: string) => {
  const res = await fetch(`/api/whatsapp/messages/${encodeURIComponent(jid)}`, {
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) return { error: data?.error, items: [] };
  return { items: data?.items ?? [] };
};

type ChatMessage = {
  id: string;
  jid: string;
  text: string;
  fromMe: boolean;
  timestamp: string;
  messageType?: string;
  imageUrl?: string | null;
  senderName?: string | null;
};

type ChatDetailProps = {
  jid: string;
};

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatDateLabel(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString("id-ID", { dateStyle: "medium" });
}

export default function ChatDetail({ jid }: ChatDetailProps) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: inboxData } = useQuery({
    queryKey: ["whatsappInbox"],
    queryFn: fetchInbox,
    refetchInterval: 5000,
  });

  const { data: messagesData } = useQuery({
    queryKey: ["whatsappMessages", jid],
    queryFn: () => fetchMessages(jid),
    refetchInterval: 5000,
  });

  const chat = inboxData?.items?.find((c: { jid: string }) => c.jid === jid);
  const messages: ChatMessage[] = messagesData?.items ?? [];
  const displayName =
    chat?.name || chat?.phoneNumber || jid.split("@")[0] || "Unknown";
  const phoneFormatted = chat?.phoneNumber
    ? `+${chat.phoneNumber}`
    : jid.split("@")[0] || "";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = message.trim();
    if (!text || sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/whatsapp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: jid, text }),
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result?.error || "Gagal mengirim pesan");
        return;
      }
      setMessage("");
    } catch {
      alert("Gagal mengirim pesan");
    } finally {
      setSending(false);
    }
  };

  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(displayName)}`;

  const groupedMessages = messages.reduce<
    { date: string; items: ChatMessage[] }[]
  >((acc, msg) => {
    const dateLabel = formatDateLabel(msg.timestamp);
    const last = acc[acc.length - 1];
    if (last && last.date === dateLabel) {
      last.items.push(msg);
    } else {
      acc.push({ date: dateLabel, items: [msg] });
    }
    return acc;
  }, []);

  return (
    <div className="flex flex-1 min-h-0 overflow-hidden rounded-3xl border border-gray-200 bg-wa-light shadow-sm">
      {/* CENTER: CHAT WINDOW */}
      <section className="flex-1 flex flex-col bg-white border-r border-gray-200 min-w-0">
        {/* Chat Header */}
        <header className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-gray-100 shrink-0 bg-white z-10">
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            <Link
              href="/dashboard/whatsapp/inbox"
              className="shrink-0 p-1.5 text-gray-500 hover:text-wa-teal transition-colors lg:hidden"
              aria-label="Kembali ke inbox"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarUrl}
                alt=""
                className="w-10 h-10 rounded-full bg-gray-100 object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-gray-900 leading-tight truncate">
                {displayName}
              </h2>
              <p className="text-xs text-green-500 font-medium">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-4 shrink-0">
            <button
              type="button"
              className="p-2.5 text-gray-400 hover:text-wa-teal hover:bg-wa-teal/5 rounded-xl transition-all"
              title="Call"
            >
              <Phone className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-2.5 text-gray-400 hover:text-wa-teal hover:bg-wa-teal/5 rounded-xl transition-all"
              title="Video"
            >
              <Video className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-gray-200 mx-0.5 hidden md:block" />
            <button
              type="button"
              className="p-2.5 text-gray-400 hover:text-wa-teal hover:bg-wa-teal/5 rounded-xl transition-all"
              title="Info"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Message History Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-50/50 no-scrollbar">
          {groupedMessages.length === 0 && !chat?.lastMessage ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-gray-500 text-sm">
                Belum ada pesan. Kirim pesan untuk memulai percakapan.
              </p>
            </div>
          ) : (
            <>
              {groupedMessages.map((group) => (
                <div key={group.date} className="space-y-6">
                  <div className="flex justify-center">
                    <span className="px-4 py-1.5 bg-gray-200/50 text-gray-500 text-[11px] font-bold rounded-full uppercase tracking-wider">
                      {group.date}
                    </span>
                  </div>
                  {group.items.map((msg) =>
                    msg.fromMe ? (
                      <div
                        key={msg.id}
                        className="flex flex-row-reverse gap-3 max-w-[85%] ml-auto"
                      >
                        <div className="flex flex-col items-end gap-1">
                          {msg.messageType === "document" ? (
                            <div className="message-sent p-4 rounded-2xl shadow-sm flex items-center gap-4 bg-[#00695C] min-w-[200px]">
                              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold truncate">
                                  {msg.text}
                                </p>
                                <p className="text-[10px] opacity-70 uppercase font-bold tracking-widest">
                                  Document
                                </p>
                              </div>
                              <button
                                type="button"
                                className="p-1.5 hover:bg-white/10 rounded-lg shrink-0"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          ) : msg.imageUrl ? (
                            <div className="message-sent p-2 rounded-2xl shadow-sm max-w-64">
                              <div className="rounded-xl overflow-hidden mb-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={msg.imageUrl}
                                  alt=""
                                  className="w-full h-40 object-cover"
                                />
                              </div>
                              {msg.text && (
                                <p className="text-xs px-2 pb-1">{msg.text}</p>
                              )}
                            </div>
                          ) : (
                            <div className="message-sent p-4 rounded-2xl shadow-sm">
                              <p className="text-[14.5px] leading-relaxed">
                                {msg.text}
                              </p>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 mr-1">
                            <span className="text-[10px] text-gray-400 font-medium">
                              {formatTime(msg.timestamp)}
                            </span>
                            <CheckCheck className="w-3.5 h-3.5 text-wa-teal" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div key={msg.id} className="flex gap-3 max-w-[85%]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={avatarUrl}
                          alt=""
                          className="w-8 h-8 rounded-full self-end bg-gray-200 shrink-0 object-cover"
                        />
                        <div className="flex flex-col gap-1 min-w-0">
                          {msg.imageUrl ? (
                            <div className="message-received p-2 rounded-2xl shadow-sm max-w-64">
                              <div className="rounded-xl overflow-hidden mb-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={msg.imageUrl}
                                  alt=""
                                  className="w-full h-40 object-cover"
                                />
                              </div>
                              {msg.text && (
                                <p className="text-xs px-2 pb-1">{msg.text}</p>
                              )}
                            </div>
                          ) : (
                            <div className="message-received p-4 rounded-2xl shadow-sm">
                              <p className="text-[14.5px] leading-relaxed">
                                {msg.text}
                              </p>
                            </div>
                          )}
                          <span className="text-[10px] text-gray-400 font-medium ml-1">
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Chat Input Section */}
        <footer className="px-4 md:px-6 py-4 bg-white border-t border-gray-100 shrink-0">
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                className="p-2.5 text-gray-400 hover:text-wa-teal transition-colors rounded-full hover:bg-wa-teal/5"
                title="Emoji"
              >
                <Smile className="w-6 h-6" />
              </button>
              <button
                type="button"
                className="p-2.5 text-gray-400 hover:text-wa-teal transition-colors rounded-full hover:bg-wa-teal/5"
                title="Lampirkan"
              >
                <Paperclip className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 relative min-w-0">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ketik pesan..."
                className="w-full pl-4 md:pl-6 pr-12 py-3.5 bg-gray-50 border border-transparent focus:bg-white focus:border-wa-teal/30 focus:ring-4 focus:ring-wa-teal/5 rounded-full transition-all text-[15px] outline-none"
                disabled={sending}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-wa-teal transition-colors"
                title="Voice"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
            <button
              type="submit"
              disabled={sending || !message.trim()}
              className="w-12 h-12 bg-wa-teal text-white rounded-full flex items-center justify-center shadow-lg shadow-wa-teal/20 hover:bg-[#065e52] disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95 shrink-0"
              title="Kirim"
            >
              <SendHorizontal className="w-6 h-6 ml-0.5" />
            </button>
          </form>
        </footer>
      </section>

      {/* RIGHT: CONTACT INFO SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-80 bg-white shrink-0 border-l border-gray-100">
        <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-24 h-24 rounded-full bg-slate-100 p-1 border-2 border-wa-teal mb-4 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarUrl}
                alt=""
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{displayName}</h3>
            <p className="text-gray-500 font-medium">{phoneFormatted}</p>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Online
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">
                Information
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                  <span className="text-gray-700 truncate">
                    {phoneFormatted.replace(/\s/g, "")}@wa
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                  <span className="text-gray-700">-</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-5 h-5 text-gray-400 shrink-0" />
                  <span className="text-gray-700">
                    {chat?.lastMessageAt
                      ? `Last seen ${new Date(chat.lastMessageAt).toLocaleString()}`
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <DownloadCloud className="w-5 h-5 text-gray-500 group-hover:text-wa-teal transition-colors shrink-0" />
                <span className="text-sm font-semibold text-gray-700">
                  Export Chat
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 shrink-0" />
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <Eraser className="w-5 h-5 text-gray-500 group-hover:text-amber-500 transition-colors shrink-0" />
                <span className="text-sm font-semibold text-gray-700">
                  Clear Chat
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 shrink-0" />
            </button>
            <div className="pt-4 space-y-2">
              <button
                type="button"
                className="w-full py-3 text-red-500 font-bold text-sm bg-red-50 hover:bg-red-100 rounded-2xl transition-colors flex items-center justify-center gap-2"
              >
                <Slash className="w-4 h-4" />
                Block Contact
              </button>
              <button
                type="button"
                className="w-full py-3 text-gray-400 font-bold text-sm hover:text-red-600 transition-colors"
              >
                Report Spam
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
