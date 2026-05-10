"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { useMessages } from "@/context/MessagesContext";
import { MOCK_USERS } from "@/data/mockUsers";
import { formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

const TABS = ["対話中", "新規"] as const;
type Tab = (typeof TABS)[number];

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("対話中");
  const { conversations } = useMessages();

  const conversationsWithUsers = conversations
    .map((conv) => {
      const otherId = conv.participantIds.find((id) => id !== "me") ?? "";
      const user = MOCK_USERS.find((u) => u.id === otherId);
      return { conv, user };
    })
    .filter((item) => item.user !== undefined);

  const hasUnread = conversationsWithUsers.some(
    ({ conv }) => conv.lastMessage && !conv.lastMessage.isRead && conv.lastMessage.senderId !== "me"
  );

  return (
    <MobileContainer>
      {/* ヘッダー */}
      <header className="sticky top-0 z-20 bg-kyomei-cream/95 backdrop-blur-sm px-5 pt-12 pb-3">
        <h1 className="text-kyomei-dark font-bold text-xl mb-4">対話</h1>

        <div className="flex gap-1 bg-kyomei-white rounded-2xl p-1 border border-kyomei-border/50">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 text-sm py-2 rounded-xl font-medium transition-all",
                activeTab === tab
                  ? "bg-kyomei-sage text-white shadow-sm"
                  : "text-kyomei-muted hover:text-kyomei-dark"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* 会話リスト */}
      <div className="px-5 pt-2 pb-4">
        {conversationsWithUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-kyomei-sage/10 flex items-center justify-center mb-4">
              <MessageCircle size={28} className="text-kyomei-sage/50" />
            </div>
            <p className="text-kyomei-muted text-sm">まだ対話がありません</p>
            <p className="text-kyomei-light text-xs mt-1">気になる人に話しかけてみましょう</p>
          </div>
        ) : (
          <div className="divide-y divide-kyomei-border/50">
            {conversationsWithUsers.map(({ conv, user }) => {
              if (!user) return null;
              const isUnread =
                conv.lastMessage &&
                !conv.lastMessage.isRead &&
                conv.lastMessage.senderId !== "me";

              return (
                <Link
                  key={conv.id}
                  href={`/messages/${user.id}`}
                  className="flex items-center gap-3 py-4 hover:bg-kyomei-white/50 rounded-2xl px-2 -mx-2 transition-colors"
                >
                  {/* アバター */}
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-kyomei-border">
                      <Image
                        src={user.avatarUrl}
                        alt={user.name}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {user.isOnline && (
                      <div className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-kyomei-sage border-2 border-kyomei-cream" />
                    )}
                  </div>

                  {/* テキスト */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className={cn("text-sm font-medium", isUnread ? "text-kyomei-dark" : "text-kyomei-dark")}>
                        {user.name}
                      </span>
                      <span className="text-kyomei-light text-xs shrink-0 ml-2">
                        {conv.lastMessage ? formatRelativeTime(conv.lastMessage.sentAt) : ""}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className={cn("text-xs truncate", isUnread ? "text-kyomei-dark font-medium" : "text-kyomei-muted")}>
                        {conv.lastMessage?.content ?? "まだメッセージがありません"}
                      </p>
                      {isUnread && (
                        <div className="w-2 h-2 rounded-full bg-kyomei-sage shrink-0 ml-2" />
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </MobileContainer>
  );
}
