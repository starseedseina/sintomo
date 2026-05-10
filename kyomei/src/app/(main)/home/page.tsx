"use client";

import { useState, useMemo } from "react";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { UserCard } from "@/components/profile/UserCard";
import { MOCK_USERS } from "@/data/mockUsers";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = ["すべて", "おすすめ", "新着"] as const;
type Tab = (typeof TABS)[number];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>("すべて");

  const users = useMemo(() => {
    if (activeTab === "おすすめ") {
      return [...MOCK_USERS].sort((a, b) => (b.resonanceScore ?? 0) - (a.resonanceScore ?? 0));
    }
    if (activeTab === "新着") {
      return [...MOCK_USERS].sort(
        (a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()
      );
    }
    return MOCK_USERS;
  }, [activeTab]);

  return (
    <MobileContainer>
      {/* ヘッダー */}
      <header className="sticky top-0 z-20 bg-kyomei-cream/95 backdrop-blur-sm px-5 pt-12 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-kyomei-dark font-bold text-xl">共鳴する仲間を探索</h1>
            <p className="text-kyomei-muted text-xs mt-0.5">気になる人を見つけて、対話を始めましょう</p>
          </div>
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-kyomei-white border border-kyomei-border">
            <SlidersHorizontal size={16} className="text-kyomei-muted" />
          </button>
        </div>

        {/* タブ */}
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

      {/* グリッド */}
      <div className="px-4 pt-3 pb-4 grid grid-cols-2 gap-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </MobileContainer>
  );
}
