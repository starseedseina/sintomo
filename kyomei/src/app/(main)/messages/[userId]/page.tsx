"use client";

import { use, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MOCK_USERS } from "@/data/mockUsers";
import { useMessages } from "@/context/MessagesContext";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { ChevronLeft, Send, MoreHorizontal } from "lucide-react";
import { formatRelativeTime, cn } from "@/lib/utils";

export default function ChatPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params);
  const router = useRouter();
  const { messages, sendMessage, markAsRead, getOrCreateConversation } = useMessages();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const user = MOCK_USERS.find((u) => u.id === userId);
  const conversationId = getOrCreateConversation(userId);
  const chatMessages = messages[conversationId] ?? [];

  useEffect(() => {
    markAsRead(conversationId);
  }, [conversationId, markAsRead]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages.length]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    sendMessage(conversationId, trimmed, "me");
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!user) return null;

  return (
    <MobileContainer className="flex flex-col h-screen">
      {/* ヘッダー */}
      <header className="flex items-center gap-3 px-4 h-14 bg-kyomei-white border-b border-kyomei-border shrink-0 pt-0">
        <button onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center">
          <ChevronLeft size={22} className="text-kyomei-dark" />
        </button>

        <Link href={`/profile/${userId}`} className="flex items-center gap-2 flex-1">
          <div className="relative">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-kyomei-border">
              <Image
                src={user.avatarUrl}
                alt={user.name}
                width={36}
                height={36}
                className="object-cover w-full h-full"
              />
            </div>
            {user.isOnline && (
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-kyomei-sage border-2 border-kyomei-white" />
            )}
          </div>
          <div>
            <p className="text-kyomei-dark text-sm font-medium">{user.name}</p>
            <p className="text-kyomei-light text-[11px]">
              {user.isOnline ? "オンライン" : `最終ログイン ${formatRelativeTime(user.lastSeenAt)}`}
            </p>
          </div>
        </Link>

        <button className="w-9 h-9 flex items-center justify-center">
          <MoreHorizontal size={18} className="text-kyomei-muted" />
        </button>
      </header>

      {/* メッセージエリア */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide">
        {chatMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-kyomei-border mx-auto mb-3">
              <Image src={user.avatarUrl} alt={user.name} width={64} height={64} className="object-cover w-full h-full" />
            </div>
            <p className="text-kyomei-dark text-sm font-medium mb-1">{user.name}さんとの対話</p>
            <p className="text-kyomei-muted text-xs leading-relaxed max-w-[240px]">
              プロフィールを見て共鳴しました。<br />自然な言葉で話しかけてみましょう。
            </p>
          </div>
        )}

        {chatMessages.map((msg, i) => {
          const isMe = msg.senderId === "me";
          const isLastFromSender =
            i === chatMessages.length - 1 || chatMessages[i + 1]?.senderId !== msg.senderId;

          return (
            <div key={msg.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
              {!isMe && (
                <div className="w-7 h-7 rounded-full overflow-hidden bg-kyomei-border mr-2 shrink-0 self-end mb-1">
                  <Image src={user.avatarUrl} alt={user.name} width={28} height={28} className="object-cover w-full h-full" />
                </div>
              )}
              <div className={cn("max-w-[72%]", isMe ? "items-end" : "items-start", "flex flex-col gap-0.5")}>
                <div
                  className={cn(
                    "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                    isMe
                      ? "bg-kyomei-sage text-white rounded-br-sm"
                      : "bg-kyomei-white text-kyomei-dark border border-kyomei-border/50 rounded-bl-sm"
                  )}
                >
                  {msg.content}
                </div>
                {isLastFromSender && (
                  <div className="flex items-center gap-1">
                    <span className="text-kyomei-light text-[10px]" suppressHydrationWarning>
                      {formatRelativeTime(msg.sentAt)}
                    </span>
                    {isMe && (
                      <span className="text-kyomei-light text-[10px]">
                        {msg.isRead ? "既読" : ""}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* 入力欄 */}
      <div className="shrink-0 px-4 py-3 bg-kyomei-white border-t border-kyomei-border flex items-end gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="メッセージを入力..."
          rows={1}
          className="flex-1 bg-kyomei-cream rounded-2xl px-4 py-2.5 text-kyomei-dark text-sm outline-none resize-none placeholder:text-kyomei-light leading-relaxed max-h-32 overflow-y-auto scrollbar-hide"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="w-10 h-10 rounded-full bg-kyomei-sage text-white flex items-center justify-center disabled:opacity-40 transition-opacity shrink-0"
        >
          <Send size={16} />
        </button>
      </div>
    </MobileContainer>
  );
}
