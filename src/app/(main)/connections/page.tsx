"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { useApp } from "@/context/AppContext";
import { useMessages } from "@/context/MessagesContext";
import { MOCK_USERS } from "@/data/mockUsers";
import { formatRelativeTime, cn } from "@/lib/utils";
import { Users } from "lucide-react";

const TABS = ["心友", "対話中", "気になる人"] as const;
type Tab = (typeof TABS)[number];

export default function ConnectionsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("心友");
  const { connections } = useApp();
  const { conversations } = useMessages();

  const getUsersByStatus = (status: "shinyu" | "talking" | "interested") => {
    return connections
      .filter((c) => c.status === status)
      .map((c) => {
        const user = MOCK_USERS.find((u) => u.id === c.userId);
        const conv = conversations.find((cv) => cv.participantIds.includes(c.userId as "me"));
        return { connection: c, user, conv };
      })
      .filter((item) => item.user !== undefined);
  };

  const tabItems = {
    "心友": getUsersByStatus("shinyu"),
    "対話中": getUsersByStatus("talking"),
    "気になる人": getUsersByStatus("interested"),
  };

  const items = tabItems[activeTab];

  return (
    <MobileContainer>
      {/* ヘッダー */}
      <header className="sticky top-0 z-20 bg-kyomei-cream/95 backdrop-blur-sm px-5 pt-12 pb-3">
        <h1 className="text-kyomei-dark font-bold text-xl mb-4">つながり</h1>

        <div className="flex gap-1 bg-kyomei-white rounded-2xl p-1 border border-kyomei-border/50">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 text-xs py-2 rounded-xl font-medium transition-all",
                activeTab === tab
                  ? "bg-kyomei-sage text-white shadow-sm"
                  : "text-kyomei-muted"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* リスト */}
      <div className="px-5 pt-2 pb-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-kyomei-sage/10 flex items-center justify-center mb-4">
              <Users size={28} className="text-kyomei-sage/50" />
            </div>
            <p className="text-kyomei-muted text-sm">まだ{activeTab}はいません</p>
            <p className="text-kyomei-light text-xs mt-1">探索画面で共鳴する人を見つけましょう</p>
          </div>
        ) : (
          <div className="divide-y divide-kyomei-border/50">
            {items.map(({ connection, user, conv }) => {
              if (!user) return null;
              const lastMsg = conv?.lastMessage;
              return (
                <Link
                  key={connection.id}
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
                    <div className="flex items-baseline justify-between mb-0.5">
                      <span className="text-kyomei-dark text-sm font-medium">{user.name}</span>
                      <span className="text-kyomei-light text-xs shrink-0 ml-2">
                        {lastMsg ? formatRelativeTime(lastMsg.sentAt) : formatRelativeTime(connection.connectedAt)}
                      </span>
                    </div>
                    <p className="text-kyomei-muted text-xs truncate">
                      {lastMsg ? lastMsg.content : user.tagline}
                    </p>
                  </div>

                  {/* 矢印 */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-kyomei-light shrink-0">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </MobileContainer>
  );
}
