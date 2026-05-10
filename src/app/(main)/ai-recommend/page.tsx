"use client";

import Image from "next/image";
import Link from "next/link";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { MOCK_USERS } from "@/data/mockUsers";
import { ValueTagList } from "@/components/profile/ValueTagList";
import { Info } from "lucide-react";

const recommendedUsers = [...MOCK_USERS]
  .filter((u) => u.resonanceScore !== undefined)
  .sort((a, b) => (b.resonanceScore ?? 0) - (a.resonanceScore ?? 0))
  .slice(0, 8);

export default function AIRecommendPage() {
  return (
    <MobileContainer>
      {/* ヘッダー */}
      <header className="sticky top-0 z-20 bg-kyomei-cream/95 backdrop-blur-sm px-5 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-kyomei-dark font-bold text-xl">あなたと共鳴しそうな人</h1>
            <p className="text-kyomei-muted text-xs mt-0.5">価値観と回答内容から共鳴度の高い人をおすすめしています</p>
          </div>
          <button className="w-9 h-9 flex items-center justify-center">
            <Info size={18} className="text-kyomei-muted" />
          </button>
        </div>
      </header>

      {/* リスト */}
      <div className="px-5 pb-6 space-y-3">
        {recommendedUsers.map((user) => (
          <Link key={user.id} href={`/profile/${user.id}`}>
            <div className="bg-kyomei-white rounded-3xl p-4 border border-kyomei-border/40 hover:border-kyomei-sage/30 transition-all flex gap-3">
              {/* アバター */}
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-kyomei-border shrink-0">
                <Image
                  src={user.avatarUrl}
                  alt={user.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* 情報 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <span className="text-kyomei-dark font-medium text-sm">{user.name}</span>
                    <span className="text-kyomei-muted text-xs ml-1.5">{user.age}</span>
                  </div>
                  {/* 共鳴度 */}
                  <div className="flex flex-col items-end shrink-0 ml-2">
                    <span className="text-kyomei-sage font-bold text-lg leading-none">{user.resonanceScore}%</span>
                    <span className="text-kyomei-muted text-[10px]">共鳴度</span>
                  </div>
                </div>

                <p className="text-kyomei-muted text-xs leading-relaxed mb-2 line-clamp-2">
                  {user.tagline}
                </p>

                <ValueTagList tags={user.valueTags} max={3} size="sm" />
              </div>
            </div>
          </Link>
        ))}

        <button className="w-full py-4 rounded-2xl border border-kyomei-border text-kyomei-muted text-sm font-medium">
          もっと見る
        </button>
      </div>
    </MobileContainer>
  );
}
