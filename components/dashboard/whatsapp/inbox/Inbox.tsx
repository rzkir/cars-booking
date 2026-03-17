"use client";

import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

const fetchInbox = async (): Promise<InboxResponse> => {
  try {
    const res = await fetch("/api/whatsapp/inbox", {
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type") || "";
    const data = (
      contentType.includes("application/json")
        ? await res.json()
        : { error: await res.text() }
    ) as InboxResponse & { raw?: unknown };

    if (!res.ok) {
      return { error: data?.error || "Gagal mengambil data inbox" };
    }

    // Guard: if API returns non-standard shape, show a helpful error.
    if (!data || !Array.isArray(data.items)) {
      return {
        error:
          "Format respons inbox tidak sesuai (items tidak ditemukan). Cek NEXT_PUBLIC_WS_URL/WS_URL dan endpoint bot /inbox.",
      };
    }

    return data;
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "Gagal mengambil data inbox";
    return { error: message };
  }
};

export default function Inbox() {
  const { data, isLoading } = useQuery<InboxResponse>({
    queryKey: ["whatsappInbox"],
    queryFn: fetchInbox,
    refetchInterval: 5000,
  });

  const chats = data?.items ?? [];

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      {/* Header di dalam card/dashboard */}
      <header className="border-b border-border px-6 md:px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Inbox
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor and manage all incoming customer conversations.
          </p>
        </div>
        <button className="bg-[#008069] hover:bg-[#065e52] text-white px-7 py-3 rounded-full font-bold flex items-center gap-2 shadow-xl shadow-[#008069]/20 transition-all transform active:scale-95 hover:-translate-y-0.5 text-sm">
          <span className="text-lg">+</span>
          New Message
        </button>
      </header>

      {/* Konten */}
      <main className="flex-1 flex flex-col w-full p-4 md:p-8 space-y-6">
        {/* Search & filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search contacts or messages..."
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-sm"
            />
          </div>
          <div className="flex items-center gap-2 bg-card p-1.5 rounded-2xl border border-border shadow-sm overflow-x-auto w-full md:w-auto text-sm">
            <button className="px-5 py-2 rounded-xl bg-[#008069] text-white font-bold whitespace-nowrap shadow-md shadow-[#008069]/20 transition-all">
              All Chats
            </button>
            <button className="px-5 py-2 rounded-xl text-muted-foreground hover:bg-muted font-medium whitespace-nowrap">
              Unread
            </button>
            <button className="px-5 py-2 rounded-xl text-muted-foreground hover:bg-muted font-medium whitespace-nowrap">
              Archived
            </button>
          </div>
        </div>

        {/* List chats */}
        <div className="flex-1 overflow-y-auto pr-2">
          {isLoading ? (
            <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
              Loading inbox...
            </div>
          ) : data?.error ? (
            <div className="rounded-2xl border border-red-100 bg-card px-4 py-3 text-sm text-destructive">
              {data.error}
            </div>
          ) : chats.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center text-center text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">
                Belum ada percakapan masuk
              </p>
              <p className="mt-1 text-muted-foreground">
                Pesan yang masuk ke nomor WhatsApp Anda akan tampil di sini.
              </p>
            </div>
          ) : (
            <div className="space-y-3 pb-8">
              {chats.map((chat) => {
                const displayName =
                  chat.name || chat.phoneNumber || chat.jid || "Unknown";
                const lastAt = chat.lastMessageAt
                  ? new Date(chat.lastMessageAt).toLocaleString()
                  : "";

                return (
                  <Link
                    key={chat.jid}
                    href={`/dashboard/whatsapp/inbox/${encodeURIComponent(chat.jid)}`}
                    className="w-full bg-card rounded-2xl p-4 border border-border shadow-sm flex items-center gap-4 cursor-pointer hover:bg-muted hover:shadow-md transition-all duration-200 relative text-left"
                  >
                    <div className="relative shrink-0">
                      <div className="w-14 h-14 bg-[#008069]/10 rounded-full flex items-center justify-center text-[#008069] font-bold text-sm">
                        {chat.isGroup
                          ? (displayName || "?").slice(0, 2).toUpperCase()
                          : "+62"}
                      </div>
                      {chat.unreadCount > 0 && (
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <h4 className="font-bold text-foreground truncate">
                          {displayName}
                        </h4>
                        <span className="text-xs font-bold text-[#008069]">
                          {lastAt}
                        </span>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          {chat.lastMessageImageUrl && (
                            <div className="shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-border bg-muted">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={chat.lastMessageImageUrl}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <p className="text-sm text-foreground truncate pr-4 font-medium flex-1 min-w-0">
                            {chat.lastMessage || ""}
                          </p>
                        </div>
                        {chat.unreadCount > 0 && (
                          <span className="w-6 h-6 bg-primary text-primary-foreground text-[11px] font-extrabold rounded-full flex items-center justify-center shadow-lg shadow-primary/40 ring-2 ring-background">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
