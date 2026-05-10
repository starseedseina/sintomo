"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { ChevronLeft } from "lucide-react";
import { ONBOARDING_QUESTIONS } from "@/data/questions";

export default function ProfileSetupPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);

  const question = ONBOARDING_QUESTIONS[currentIndex];
  const total = ONBOARDING_QUESTIONS.length;
  const progress = ((currentIndex) / total) * 100;

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.push("/values-setup");
    }
  };

  const updateAnswer = (text: string) => {
    const next = [...answers];
    next[currentIndex] = text;
    setAnswers(next);
  };

  return (
    <MobileContainer className="min-h-screen flex flex-col">
      {/* ヘッダー */}
      <header className="flex items-center justify-between px-4 h-14">
        <button
          onClick={() => currentIndex > 0 ? setCurrentIndex((p) => p - 1) : router.back()}
          className="w-9 h-9 flex items-center justify-center text-kyomei-dark"
        >
          <ChevronLeft size={22} />
        </button>
        <span className="text-kyomei-muted text-sm">{currentIndex + 1}/{total}</span>
        <div className="w-9" />
      </header>

      {/* プログレスバー */}
      <div className="mx-6 mb-6">
        <div className="h-1 bg-kyomei-border rounded-full overflow-hidden">
          <div
            className="h-full bg-kyomei-sage rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col px-6">
        {/* ガイドテキスト */}
        <p className="text-kyomei-muted text-sm mb-4">
          質問に答えて、あなたのことを表現してみましょう
        </p>

        {/* 質問カード */}
        <div className="bg-kyomei-white rounded-3xl p-6 mb-6 border border-kyomei-border/50">
          <h2 className="text-kyomei-dark font-medium text-base leading-relaxed mb-6">
            {question.text}
          </h2>
          <textarea
            value={answers[currentIndex]}
            onChange={(e) => updateAnswer(e.target.value)}
            placeholder={question.placeholder}
            maxLength={500}
            rows={6}
            className="w-full bg-transparent text-kyomei-dark text-sm leading-relaxed outline-none resize-none placeholder:text-kyomei-light"
          />
          <div className="flex justify-end mt-2">
            <span className="text-kyomei-light text-xs">
              {answers[currentIndex].length}/500
            </span>
          </div>
        </div>

        {/* ヒント */}
        <p className="text-kyomei-light text-xs text-center mb-8">
          正解はありません。感じるままに書いてください。
        </p>
      </div>

      {/* ボタン */}
      <div className="px-6 pb-10">
        <button
          onClick={handleNext}
          disabled={answers[currentIndex].trim().length < 5}
          className="w-full bg-kyomei-sage text-white py-4 rounded-2xl font-medium text-sm disabled:opacity-40 transition-opacity"
        >
          {currentIndex < total - 1 ? "次へ" : "完了"}
        </button>
      </div>
    </MobileContainer>
  );
}
