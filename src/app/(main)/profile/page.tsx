"use client";

import Image from "next/image";
import Link from "next/link";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { useApp } from "@/context/AppContext";
import { ValueTagList } from "@/components/profile/ValueTagList";
import { Settings, Edit2, MapPin, Briefcase } from "lucide-react";

export default function MyProfilePage() {
  const { currentUser } = useApp();

  return (
    <MobileContainer>
      {/* ヘッダー */}
      <header className="sticky top-0 z-20 bg-kyomei-cream/95 backdrop-blur-sm px-5 pt-12 pb-3 flex items-center justify-between">
        <h1 className="text-kyomei-dark font-bold text-xl">マイページ</h1>
        <Link
          href="/settings"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-kyomei-white border border-kyomei-border"
        >
          <Settings size={16} className="text-kyomei-muted" />
        </Link>
      </header>

      <div className="px-5 pb-10">
        {/* プロフィールカード */}
        <div className="bg-kyomei-white rounded-3xl p-5 mb-4 border border-kyomei-border/40">
          <div className="flex items-start gap-4 mb-4">
            {/* アバター */}
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-kyomei-border shrink-0">
              <Image
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>

            {/* 基本情報 */}
            <div className="flex-1">
              <h2 className="text-kyomei-dark font-bold text-xl mb-0.5">
                {currentUser.fieldVisibility?.displayName !== false ? currentUser.name : "（非公開）"}
                {currentUser.fieldVisibility?.age !== false && (
                  <span className="text-kyomei-muted text-base font-normal ml-2">{currentUser.age}</span>
                )}
              </h2>
              {currentUser.realName && currentUser.fieldVisibility?.realName && (
                <p className="text-kyomei-muted text-xs mb-1">（{currentUser.realName}）</p>
              )}
              {currentUser.fieldVisibility?.currentArea !== false && (currentUser.currentArea || currentUser.location) && (
                <div className="flex items-center gap-1 text-kyomei-muted text-xs mb-1">
                  <MapPin size={11} />
                  <span>{currentUser.currentArea || currentUser.location}</span>
                </div>
              )}
              {currentUser.fieldVisibility?.birthPrefecture && currentUser.birthPrefecture && currentUser.birthPrefecture !== "未設定" && (
                <div className="flex items-center gap-1 text-kyomei-muted text-xs mb-1">
                  <span className="text-kyomei-light">出身</span>
                  <span>{currentUser.birthPrefecture}</span>
                </div>
              )}
              {currentUser.fieldVisibility?.occupation !== false && (
                <div className="flex items-center gap-1 text-kyomei-muted text-xs">
                  <Briefcase size={11} />
                  <span>{currentUser.occupation}</span>
                </div>
              )}
              {currentUser.gender && currentUser.gender !== "回答しない" && currentUser.fieldVisibility?.gender && (
                <div className="flex items-center gap-1 text-kyomei-muted text-xs mt-1">
                  <span>{currentUser.gender}</span>
                </div>
              )}
            </div>
          </div>

          {/* 一言 */}
          <p className="text-kyomei-muted text-sm leading-relaxed mb-4">{currentUser.tagline}</p>

          {/* 私について */}
          {currentUser.aboutMe && (
            <div className="mb-3">
              <p className="text-kyomei-dark text-xs font-medium mb-1">私について</p>
              <p className="text-kyomei-muted text-sm leading-relaxed">{currentUser.aboutMe}</p>
            </div>
          )}

          {/* こんな方と繋がりたい */}
          {currentUser.idealConnection && (
            <div className="mb-4">
              <p className="text-kyomei-dark text-xs font-medium mb-1">こんな方と繋がりたい</p>
              <p className="text-kyomei-muted text-sm leading-relaxed">{currentUser.idealConnection}</p>
            </div>
          )}

          {/* タグ */}
          <ValueTagList tags={currentUser.valueTags} />
        </div>

        {/* 編集ボタン */}
        <Link
          href="/profile/edit"
          className="w-full flex items-center justify-center gap-2 bg-kyomei-white border border-kyomei-border rounded-2xl py-3.5 text-kyomei-dark text-sm font-medium mb-5"
        >
          <Edit2 size={15} />
          プロフィールを編集
        </Link>

        {/* 大切にしていること */}
        <div className="bg-kyomei-white rounded-3xl p-5 mb-4 border border-kyomei-border/40">
          <h3 className="text-kyomei-dark text-sm font-medium mb-2">大切にしていること</h3>
          <p className="text-kyomei-muted text-sm leading-relaxed">{currentUser.cherished}</p>
        </div>

        {/* 深い質問の回答 */}
        <div className="bg-kyomei-white rounded-3xl p-5 border border-kyomei-border/40">
          <h3 className="text-kyomei-dark text-sm font-medium mb-3">深い質問への回答</h3>
          <div className="space-y-4">
            {currentUser.deepAnswers.map((qa) => (
              <div key={qa.questionId}>
                <p className="text-kyomei-muted text-xs mb-1.5">{qa.questionText}</p>
                <p className="text-kyomei-dark text-sm leading-relaxed">{qa.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
