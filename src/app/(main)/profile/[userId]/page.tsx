"use client";

import { use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MOCK_USERS } from "@/data/mockUsers";
import { useApp } from "@/context/AppContext";
import { useMessages } from "@/context/MessagesContext";
import { ValueTagList } from "@/components/profile/ValueTagList";
import { PageHeader } from "@/components/layout/PageHeader";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { Heart, MessageCircle, MapPin, MoreHorizontal, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ProfileDetailPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params);
  const router = useRouter();
  const { getConnectionStatus, setInterested, startConversation } = useApp();
  const { getOrCreateConversation } = useMessages();
  const [showReport, setShowReport] = useState(false);
  const [likeAnim, setLikeAnim] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; rotate: number }[]>([]);

  const user = MOCK_USERS.find((u) => u.id === userId);
  if (!user) return <div className="p-8 text-center text-kyomei-muted">ユーザーが見つかりません</div>;

  const status = getConnectionStatus(userId);

  const handleInterested = () => {
    if (status === "interested" || status === "shinyu") return;
    setInterested(userId);
    // ハートパーティクル生成
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: (i - 2.5) * 18,
      rotate: (i - 2.5) * 15,
    }));
    setParticles(newParticles);
    setLikeAnim(true);
    setTimeout(() => {
      setParticles([]);
      setLikeAnim(false);
    }, 700);
  };

  const handleStartChat = () => {
    startConversation(userId);
    const convId = getOrCreateConversation(userId);
    router.push(`/messages/${userId}`);
  };

  return (
    <MobileContainer>
      {/* ヘッダー写真 */}
      <div className="relative">
        <div className="relative aspect-[3/4] max-h-[480px] overflow-hidden bg-kyomei-border">
          <Image
            src={user.avatarUrl}
            alt={user.name}
            fill
            className="object-cover"
            priority
            sizes="390px"
          />
          {/* グラデーション */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* オーバーレイ: 戻る・メニュー */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pt-14">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/80 text-kyomei-dark"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => setShowReport((p) => !p)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/80 text-kyomei-dark"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* 名前・基本情報（写真下部） */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 text-white">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-bold">{user.name} <span className="text-lg font-normal opacity-80">{user.age}</span></h1>
              <div className="flex items-center gap-1 mt-1 opacity-80">
                <MapPin size={13} />
                <span className="text-sm">{user.location}</span>
                <span className="text-sm mx-1">·</span>
                <span className="text-sm">{user.occupation}</span>
              </div>
            </div>
            {user.isOnline && (
              <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
                <div className="w-2 h-2 rounded-full bg-kyomei-sage" />
                <span className="text-xs">オンライン</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="px-5 py-5 space-y-5">
        {/* 価値観タグ */}
        <section>
          <h2 className="text-kyomei-muted text-xs font-medium mb-2.5 tracking-wide">価値観タグ</h2>
          <ValueTagList tags={user.valueTags} />
        </section>

        <div className="h-px bg-kyomei-border" />

        {/* 私について */}
        {user.aboutMe && (
          <>
            <section>
              <h2 className="text-kyomei-dark text-sm font-medium mb-2">私について</h2>
              <p className="text-kyomei-muted text-sm leading-relaxed">{user.aboutMe}</p>
            </section>
            <div className="h-px bg-kyomei-border" />
          </>
        )}

        {/* こんな方と繋がりたい */}
        {user.idealConnection && (
          <>
            <section>
              <h2 className="text-kyomei-dark text-sm font-medium mb-2">こんな方と繋がりたい</h2>
              <p className="text-kyomei-muted text-sm leading-relaxed">{user.idealConnection}</p>
            </section>
            <div className="h-px bg-kyomei-border" />
          </>
        )}

        {/* 大切にしていること */}
        <section>
          <h2 className="text-kyomei-dark text-sm font-medium mb-2">大切にしていること</h2>
          <p className="text-kyomei-muted text-sm leading-relaxed">{user.cherished}</p>
        </section>

        <div className="h-px bg-kyomei-border" />

        {/* 深い質問の回答 */}
        <section>
          <h2 className="text-kyomei-dark text-sm font-medium mb-3">深い質問への回答</h2>
          <div className="space-y-4">
            {user.deepAnswers.map((qa) => (
              <div key={qa.questionId} className="bg-kyomei-cream rounded-2xl p-4">
                <p className="text-kyomei-muted text-xs mb-2">{qa.questionText}</p>
                <p className="text-kyomei-dark text-sm leading-relaxed line-clamp-4">{qa.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* レポートメニュー */}
        {showReport && (
          <div className="fixed inset-0 bg-black/30 z-50 flex items-end" onClick={() => setShowReport(false)}>
            <div className="w-full max-w-[390px] mx-auto bg-kyomei-white rounded-t-3xl p-5 pb-10" onClick={(e) => e.stopPropagation()}>
              <div className="w-10 h-1 bg-kyomei-border rounded-full mx-auto mb-5" />
              <button className="w-full flex items-center gap-3 py-4 text-red-500 border-b border-kyomei-border">
                <Flag size={18} />
                <span className="text-sm">通報する</span>
              </button>
              <button className="w-full flex items-center gap-3 py-4 text-red-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                <span className="text-sm">ブロックする</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* アクションボタン（固定） */}
      <div className="sticky bottom-16 px-5 pb-4 pt-3 bg-kyomei-cream/95 backdrop-blur-sm border-t border-kyomei-border/50">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            {/* パーティクル */}
            {particles.map((p) => (
              <span
                key={p.id}
                className="pointer-events-none absolute left-1/2 bottom-full text-kyomei-sage"
                style={{
                  transform: `translateX(calc(-50% + ${p.x}px))`,
                  animation: "heartFloat 0.7s ease-out forwards",
                  rotate: `${p.rotate}deg`,
                  fontSize: "18px",
                }}
              >
                ♡
              </span>
            ))}
            <button
              onClick={handleInterested}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border text-sm font-medium transition-all",
                likeAnim && "scale-110",
                status === "interested" || status === "shinyu"
                  ? "bg-kyomei-sage/10 border-kyomei-sage text-kyomei-sage"
                  : "bg-kyomei-white border-kyomei-border text-kyomei-dark"
              )}
              style={{ transition: likeAnim ? "transform 0.15s ease-out" : "transform 0.3s ease-in, color 0.2s, background 0.2s" }}
            >
              <Heart
                size={16}
                className={cn(
                  "transition-all duration-200",
                  likeAnim && "scale-125",
                  status === "interested" || status === "shinyu" ? "fill-kyomei-sage text-kyomei-sage" : ""
                )}
              />
              {status === "interested" || status === "shinyu" ? "気になっている" : "気になる"}
            </button>
          </div>
          <button
            onClick={handleStartChat}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-kyomei-sage text-white text-sm font-medium"
          >
            <MessageCircle size={16} />
            対話を始める
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
