"use client";

import Link from "next/link";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { Sparkles, Heart, MessageCircle, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <MobileContainer className="min-h-screen flex flex-col">
      {/* ヒーローセクション */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-12 text-center">
        {/* 背景の装飾 */}
        <div className="absolute top-0 left-0 right-0 h-64 overflow-hidden pointer-events-none">
          <div className="absolute top-8 left-8 w-32 h-32 rounded-full bg-kyomei-sage/10 blur-3xl" />
          <div className="absolute top-16 right-8 w-24 h-24 rounded-full bg-kyomei-sage/8 blur-2xl" />
        </div>

        {/* ロゴ */}
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-full bg-kyomei-sage/15 flex items-center justify-center mb-4 mx-auto">
            <div className="w-14 h-14 rounded-full border-2 border-kyomei-sage/40 flex items-center justify-center">
              <span className="text-kyomei-sage font-display text-2xl font-bold">共</span>
            </div>
          </div>
          <h1 className="font-display text-4xl font-bold text-kyomei-dark tracking-wide">共鳴</h1>
          <p className="text-kyomei-muted text-sm mt-1 tracking-wider">KYOMEI</p>
        </div>

        {/* キャッチコピー */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-kyomei-dark leading-relaxed mb-3">
            心友と共鳴して
            <br />
            繋がる場所
          </h2>
          <p className="text-kyomei-muted text-sm leading-relaxed">
            価値観・感性・精神性の近い人と
            <br />
            本質的なつながりを育むコミュニティ
          </p>
        </div>

        {/* 特徴 */}
        <div className="w-full space-y-3 mb-10">
          {[
            { icon: Heart, text: "安心・安全な環境" },
            { icon: Sparkles, text: "自然体でいられる" },
            { icon: MessageCircle, text: "本質的なつながり" },
            { icon: Users, text: "比較や競争を生まない" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 bg-kyomei-white/70 rounded-2xl px-4 py-3">
              <div className="w-8 h-8 rounded-full bg-kyomei-sage/10 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-kyomei-sage" />
              </div>
              <span className="text-kyomei-dark text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>

        {/* CTA ボタン */}
        <div className="w-full space-y-3">
          <Link
            href="/register"
            className="block w-full bg-kyomei-sage text-white text-center py-4 rounded-2xl font-medium text-base tracking-wide hover:bg-kyomei-sage-dark transition-colors"
          >
            はじめる
          </Link>
          <Link
            href="/home"
            className="block w-full text-kyomei-muted text-center py-3 text-sm"
          >
            すでにアカウントをお持ちの方
          </Link>
        </div>
      </div>

      {/* フッター */}
      <div className="px-6 pb-8 text-center">
        <p className="text-kyomei-light text-xs">
          利用規約とプライバシーポリシーに同意の上、ご利用ください
        </p>
      </div>
    </MobileContainer>
  );
}
