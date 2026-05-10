"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { ChevronLeft, Mail, Apple } from "lucide-react";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <MobileContainer className="min-h-screen flex flex-col">
      {/* ヘッダー */}
      <header className="flex items-center px-4 h-14">
        <button onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center text-kyomei-dark">
          <ChevronLeft size={22} />
        </button>
      </header>

      <div className="flex-1 flex flex-col px-6 pt-4">
        {/* ロゴ */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-kyomei-dark">共鳴</h1>
          <p className="text-kyomei-muted text-sm mt-1">はじめましょう</p>
        </div>

        {/* ソーシャルログインボタン */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => router.push("/profile-setup")}
            className="w-full flex items-center justify-center gap-3 bg-kyomei-dark text-white py-4 rounded-2xl font-medium text-sm"
          >
            <Apple size={20} />
            Appleでつづける
          </button>

          <button
            onClick={() => router.push("/profile-setup")}
            className="w-full flex items-center justify-center gap-3 bg-kyomei-white border border-kyomei-border text-kyomei-dark py-4 rounded-2xl font-medium text-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Googleでつづける
          </button>
        </div>

        {/* セパレーター */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-kyomei-border" />
          <span className="text-kyomei-light text-xs">または</span>
          <div className="flex-1 h-px bg-kyomei-border" />
        </div>

        {/* メール入力 */}
        <div className="space-y-3">
          <div>
            <label className="text-kyomei-muted text-sm block mb-2">メールアドレス</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-kyomei-light" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full bg-kyomei-white border border-kyomei-border rounded-2xl px-4 py-3 pl-10 text-kyomei-dark text-sm outline-none focus:border-kyomei-sage transition-colors placeholder:text-kyomei-light"
              />
            </div>
          </div>
          <button
            onClick={() => router.push("/profile-setup")}
            className="w-full bg-kyomei-sage text-white py-4 rounded-2xl font-medium text-sm"
          >
            メールでつづける
          </button>
        </div>

        {/* 注意書き */}
        <div className="mt-8 p-4 bg-kyomei-white/60 rounded-2xl">
          <p className="text-kyomei-muted text-xs leading-relaxed text-center">
            本サービスは、深い対話と本質的なつながりを求める方のための空間です。
            ニックネームでのご参加も可能です。
          </p>
        </div>
      </div>
    </MobileContainer>
  );
}
