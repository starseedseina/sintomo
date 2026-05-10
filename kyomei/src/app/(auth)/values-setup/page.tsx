"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { ChevronLeft, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ValueTag } from "@/types/user";
import { useApp } from "@/context/AppContext";

const ALL_TAGS: ValueTag[] = [
  "瞑想", "心理学", "自己理解", "宇宙法則", "波動", "エネルギー",
  "食", "自然療法", "禅", "ヨガ", "哲学", "ミニマリズム",
  "感情理解", "アート", "詩", "音楽", "自然", "読書",
  "旅", "創造性", "内省", "スピリチュアル", "引き寄せ",
  "マインドフルネス", "感謝", "シンプルライフ", "カウンセリング",
  "表現", "アロマ", "オーガニック", "ヒーリング", "自己成長", "対話",
];

const POPULAR_TAGS: ValueTag[] = [
  "瞑想", "自然", "内省", "ヨガ", "感謝", "心理学",
  "宇宙法則", "自己理解", "シンプルライフ",
];

function ValuesSetupInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentUser, updateProfile } = useApp();

  // 既存のタグを初期選択状態として使う
  const [selected, setSelected] = useState<ValueTag[]>(currentUser.valueTags ?? []);
  const [search, setSearch] = useState("");

  const from = searchParams.get("from"); // "edit" のとき編集から来ている

  const filteredTags = ALL_TAGS.filter((t) =>
    search === "" || t.includes(search)
  );

  const toggle = (tag: ValueTag) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = () => {
    updateProfile({ valueTags: selected });
    router.push(from === "edit" ? "/profile/edit" : "/home");
  };

  return (
    <MobileContainer className="min-h-screen flex flex-col">
      {/* ヘッダー */}
      <header className="flex items-center justify-between px-4 h-14">
        <button onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center text-kyomei-dark">
          <ChevronLeft size={22} />
        </button>
        <span className="text-kyomei-dark text-sm font-medium">価値観タグ</span>
        <div className="w-9" />
      </header>

      <div className="flex-1 flex flex-col px-5 overflow-y-auto">
        <div className="mb-5">
          <h2 className="text-kyomei-dark font-medium text-base mb-1">
            あなたの価値観に近いものを
            <br />
            選んでください（複数選択可）
          </h2>
          <p className="text-kyomei-muted text-xs">3つ以上選ぶとおすすめが精度よく表示されます</p>
        </div>

        {/* 検索 */}
        <div className="relative mb-5">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-kyomei-light" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="タグを検索"
            className="w-full bg-kyomei-white border border-kyomei-border rounded-2xl px-4 py-2.5 pl-10 text-sm text-kyomei-dark outline-none focus:border-kyomei-sage transition-colors placeholder:text-kyomei-light"
          />
        </div>

        {/* 人気タグ */}
        {search === "" && (
          <div className="mb-5">
            <h3 className="text-kyomei-muted text-xs font-medium mb-3">人気のタグ</h3>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TAGS.map((tag) => (
                <TagButton key={tag} tag={tag} selected={selected.includes(tag)} onToggle={toggle} />
              ))}
            </div>
          </div>
        )}

        {/* すべてのタグ */}
        <div className="mb-6">
          <h3 className="text-kyomei-muted text-xs font-medium mb-3">
            {search === "" ? "すべてのタグ" : `検索結果（${filteredTags.length}件）`}
          </h3>
          <div className="flex flex-wrap gap-2">
            {filteredTags.map((tag) => (
              <TagButton key={tag} tag={tag} selected={selected.includes(tag)} onToggle={toggle} />
            ))}
          </div>
        </div>
      </div>

      {/* 保存ボタン */}
      <div className="px-5 pb-10 pt-3 bg-kyomei-cream">
        <button
          onClick={handleSave}
          disabled={selected.length < 1}
          className="w-full bg-kyomei-sage text-white py-4 rounded-2xl font-medium text-sm disabled:opacity-40 transition-opacity"
        >
          選択したタグを保存 {selected.length > 0 && `(${selected.length})`}
        </button>
      </div>
    </MobileContainer>
  );
}

export default function ValuesSetupPage() {
  return (
    <Suspense>
      <ValuesSetupInner />
    </Suspense>
  );
}

function TagButton({
  tag,
  selected,
  onToggle,
}: {
  tag: ValueTag;
  selected: boolean;
  onToggle: (tag: ValueTag) => void;
}) {
  return (
    <button
      onClick={() => onToggle(tag)}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-all border",
        selected
          ? "bg-kyomei-sage text-white border-kyomei-sage"
          : "bg-kyomei-white text-kyomei-dark border-kyomei-border hover:border-kyomei-sage/50"
      )}
    >
      {tag}
    </button>
  );
}
