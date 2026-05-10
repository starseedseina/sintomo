"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { useApp } from "@/context/AppContext";
import { ChevronLeft, Eye, EyeOff, Camera, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DeepAnswer, ProfileFieldVisibility } from "@/types/user";
import Image from "next/image";

type VisibilityKey = keyof ProfileFieldVisibility;

const GENDER_OPTIONS = ["回答しない", "男性", "女性", "ノンバイナリー", "その他"];

const PREFECTURES = [
  "未設定",
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県", "海外",
];

const DEFAULT_VISIBILITY: ProfileFieldVisibility = {
  realName: false,
  displayName: true,
  age: true,
  gender: false,
  occupation: true,
  birthPrefecture: false,
  currentArea: true,
};

export default function ProfileEditPage() {
  const router = useRouter();
  const { currentUser, updateProfile } = useApp();

  // 既存の保存済みデータを初期値として使う
  const [realName, setRealName] = useState(currentUser.realName ?? "");
  const [name, setName] = useState(currentUser.name);
  const [age, setAge] = useState(String(currentUser.age));
  const [gender, setGender] = useState(currentUser.gender ?? "回答しない");
  const [occupation, setOccupation] = useState(currentUser.occupation);
  const [birthPrefecture, setBirthPrefecture] = useState(currentUser.birthPrefecture ?? "未設定");
  const [currentArea, setCurrentArea] = useState(currentUser.currentArea ?? currentUser.location ?? "");
  const [tagline, setTagline] = useState(currentUser.tagline);
  const [aboutMe, setAboutMe] = useState(currentUser.aboutMe ?? "");
  const [idealConnection, setIdealConnection] = useState(currentUser.idealConnection ?? "");
  const [cherished, setCherished] = useState(currentUser.cherished);
  const [deepAnswers, setDeepAnswers] = useState<DeepAnswer[]>(currentUser.deepAnswers);
  const [visibility, setVisibility] = useState<ProfileFieldVisibility>(
    { ...DEFAULT_VISIBILITY, ...currentUser.fieldVisibility }
  );

  // 写真（最大3枚）：既存の photos または avatarUrl を初期値に
  const initPhotos = (): (string | null)[] => {
    const saved = currentUser.photos;
    if (saved && saved.length > 0) {
      return [saved[0] ?? null, saved[1] ?? null, saved[2] ?? null];
    }
    return [currentUser.avatarUrl, null, null];
  };
  const [photos, setPhotos] = useState<(string | null)[]>(initPhotos);

  const toggleVisibility = (key: VisibilityKey) => {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePhotoChange = useCallback((index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPhotos((prev) => {
        const next = [...prev];
        next[index] = dataUrl;
        return next;
      });
    };
    reader.readAsDataURL(file);
  }, []);

  const handlePhotoRemove = (index: number) => {
    setPhotos((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const handleSave = () => {
    const validPhotos = photos.filter((p): p is string => p !== null);
    updateProfile({
      realName,
      name: name.trim() || currentUser.name,
      age: Number(age) || currentUser.age,
      gender,
      occupation: occupation.trim() || currentUser.occupation,
      birthPrefecture,
      currentArea: currentArea.trim(),
      tagline,
      aboutMe,
      idealConnection,
      cherished,
      deepAnswers,
      fieldVisibility: visibility,
      photos: validPhotos,
      // 1枚目をアバターとして使う
      avatarUrl: validPhotos[0] || currentUser.avatarUrl,
    });
    router.push("/profile");
  };

  return (
    <MobileContainer>
      {/* ヘッダー */}
      <header className="flex items-center px-4 h-14 bg-kyomei-white border-b border-kyomei-border sticky top-0 z-20">
        <button onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center">
          <ChevronLeft size={22} className="text-kyomei-dark" />
        </button>
        <h1 className="text-kyomei-dark font-medium text-base flex-1 text-center">プロフィール編集</h1>
        <button
          onClick={handleSave}
          className="text-kyomei-sage text-sm font-medium"
        >
          保存
        </button>
      </header>

      <div className="px-5 py-5 space-y-6 pb-24">

        {/* ── 写真 ── */}
        <section>
          <p className="text-kyomei-muted text-xs font-medium mb-3 tracking-wide">写真（最大3枚）</p>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <PhotoSlot
                key={i}
                index={i}
                src={photos[i]}
                isMain={i === 0}
                onChange={handlePhotoChange}
                onRemove={handlePhotoRemove}
              />
            ))}
          </div>
          <p className="text-kyomei-light text-[11px] mt-2">1枚目がプロフィールのメイン写真になります</p>
        </section>


        {/* ── 基本情報 ── */}
        <section>
          <p className="text-kyomei-muted text-xs font-medium mb-3 tracking-wide">基本情報</p>
          <div className="bg-kyomei-white border border-kyomei-border rounded-2xl divide-y divide-kyomei-border/60">

            {/* 本名 */}
            <FieldRow
              label="本名"
              note="他のユーザーには表示されません"
              visible={visibility.realName}
              onToggle={() => toggleVisibility("realName")}
              showToggle
            >
              <input
                type="text"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                placeholder="山田 太郎"
                className="w-full bg-transparent text-kyomei-dark text-sm outline-none placeholder:text-kyomei-light"
              />
            </FieldRow>

            {/* 表示名 */}
            <FieldRow
              label="表示名"
              visible={visibility.displayName}
              onToggle={() => toggleVisibility("displayName")}
              showToggle
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ニックネームでもOK"
                className="w-full bg-transparent text-kyomei-dark text-sm outline-none placeholder:text-kyomei-light"
              />
            </FieldRow>

            {/* 年齢 */}
            <FieldRow
              label="年齢"
              visible={visibility.age}
              onToggle={() => toggleVisibility("age")}
              showToggle
            >
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="28"
                min={18}
                max={99}
                className="w-full bg-transparent text-kyomei-dark text-sm outline-none placeholder:text-kyomei-light [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </FieldRow>

            {/* 性別 */}
            <FieldRow
              label="性別"
              visible={visibility.gender}
              onToggle={() => toggleVisibility("gender")}
              showToggle
            >
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-transparent text-kyomei-dark text-sm outline-none"
              >
                {GENDER_OPTIONS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </FieldRow>

            {/* 職業 */}
            <FieldRow
              label="職業"
              visible={visibility.occupation}
              onToggle={() => toggleVisibility("occupation")}
              showToggle
            >
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="フリーランスデザイナー"
                className="w-full bg-transparent text-kyomei-dark text-sm outline-none placeholder:text-kyomei-light"
              />
            </FieldRow>

            {/* 出身都道府県 */}
            <FieldRow
              label="出身都道府県"
              visible={visibility.birthPrefecture}
              onToggle={() => toggleVisibility("birthPrefecture")}
              showToggle
            >
              <select
                value={birthPrefecture}
                onChange={(e) => setBirthPrefecture(e.target.value)}
                className="w-full bg-transparent text-kyomei-dark text-sm outline-none"
              >
                {PREFECTURES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </FieldRow>

            {/* お住まいの地域 */}
            <FieldRow
              label="お住まいの地域"
              visible={visibility.currentArea}
              onToggle={() => toggleVisibility("currentArea")}
              showToggle
            >
              <input
                type="text"
                value={currentArea}
                onChange={(e) => setCurrentArea(e.target.value)}
                placeholder="東京都渋谷区"
                className="w-full bg-transparent text-kyomei-dark text-sm outline-none placeholder:text-kyomei-light"
              />
            </FieldRow>

          </div>
        </section>

        {/* ── 自己紹介 ── */}
        <section>
          <p className="text-kyomei-muted text-xs font-medium mb-3 tracking-wide">自己紹介</p>
          <div className="space-y-4">

            {/* 一言 */}
            <div>
              <label className="text-kyomei-muted text-xs mb-1.5 block">一言（カードに表示）</label>
              <textarea
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                rows={2}
                className="w-full bg-kyomei-white border border-kyomei-border rounded-2xl px-4 py-3 text-kyomei-dark text-sm outline-none focus:border-kyomei-sage transition-colors resize-none"
              />
            </div>

            {/* 私について */}
            <div>
              <label className="text-kyomei-muted text-xs mb-1.5 block">私について</label>
              <textarea
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                rows={3}
                placeholder="自分の性格や普段の過ごし方など..."
                className="w-full bg-kyomei-white border border-kyomei-border rounded-2xl px-4 py-3 text-kyomei-dark text-sm outline-none focus:border-kyomei-sage transition-colors resize-none placeholder:text-kyomei-light"
              />
            </div>

            {/* こんな方と繋がりたい */}
            <div>
              <label className="text-kyomei-muted text-xs mb-1.5 block">こんな方と繋がりたい</label>
              <textarea
                value={idealConnection}
                onChange={(e) => setIdealConnection(e.target.value)}
                rows={3}
                placeholder="どんな人と出会いたいか、どんな対話がしたいか..."
                className="w-full bg-kyomei-white border border-kyomei-border rounded-2xl px-4 py-3 text-kyomei-dark text-sm outline-none focus:border-kyomei-sage transition-colors resize-none placeholder:text-kyomei-light"
              />
            </div>

            {/* 大切にしていること */}
            <div>
              <label className="text-kyomei-muted text-xs mb-1.5 block">大切にしていること</label>
              <textarea
                value={cherished}
                onChange={(e) => setCherished(e.target.value)}
                rows={3}
                className="w-full bg-kyomei-white border border-kyomei-border rounded-2xl px-4 py-3 text-kyomei-dark text-sm outline-none focus:border-kyomei-sage transition-colors resize-none"
              />
            </div>

          </div>
        </section>

        {/* ── 価値観タグ ── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <p className="text-kyomei-muted text-xs font-medium tracking-wide">価値観タグ</p>
            <span className="text-kyomei-sage text-xs font-medium">{currentUser.valueTags.length}個選択中</span>
          </div>
          {/* 現在のタグ一覧 */}
          <div className="flex flex-wrap gap-2 mb-3">
            {currentUser.valueTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-kyomei-sage/10 text-kyomei-sage border border-kyomei-sage/20"
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={() => router.push("/values-setup?from=edit")}
            className="w-full flex items-center justify-between bg-kyomei-white border border-kyomei-border rounded-2xl px-4 py-3"
          >
            <span className="text-kyomei-muted text-sm">タグを変更する</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-kyomei-light">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </section>

        {/* ── 深い質問の回答 ── */}
        <section>
          <p className="text-kyomei-muted text-xs font-medium mb-3 tracking-wide">深い質問への回答</p>
          <div className="space-y-3">
            {deepAnswers.map((qa, idx) => (
              <div key={qa.questionId} className="bg-kyomei-white rounded-2xl p-4 border border-kyomei-border/50">
                <p className="text-kyomei-muted text-xs mb-2">{qa.questionText}</p>
                <textarea
                  value={qa.answer}
                  onChange={(e) => {
                    const updated = [...deepAnswers];
                    updated[idx] = { ...qa, answer: e.target.value };
                    setDeepAnswers(updated);
                  }}
                  rows={3}
                  className="w-full bg-transparent text-kyomei-dark text-sm leading-relaxed outline-none resize-none"
                />
              </div>
            ))}
          </div>
        </section>

      </div>
    </MobileContainer>
  );
}

/* ── 写真スロットコンポーネント ── */
function PhotoSlot({
  index,
  src,
  isMain,
  onChange,
  onRemove,
}: {
  index: number;
  src: string | null;
  isMain: boolean;
  onChange: (index: number, file: File) => void;
  onRemove: (index: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-kyomei-border cursor-pointer",
          isMain ? "aspect-[3/4]" : "aspect-[3/4]"
        )}
        onClick={() => inputRef.current?.click()}
      >
        {src ? (
          <Image src={src} alt={`写真${index + 1}`} fill className="object-cover" unoptimized />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <Camera size={20} className="text-kyomei-light" />
            <span className="text-kyomei-light text-[10px]">{isMain ? "メイン" : "追加"}</span>
          </div>
        )}
        {/* メインバッジ */}
        {isMain && src && (
          <div className="absolute bottom-1.5 left-1.5 bg-black/50 rounded-full px-2 py-0.5">
            <span className="text-white text-[10px]">メイン</span>
          </div>
        )}
      </div>
      {/* 削除ボタン */}
      {src && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove(index); }}
          className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center"
        >
          <X size={11} className="text-white" />
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChange(index, file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

/* ── 共通フィールド行コンポーネント ── */
function FieldRow({
  label,
  note,
  visible,
  onToggle,
  showToggle,
  children,
}: {
  label: string;
  note?: string;
  visible: boolean;
  onToggle: () => void;
  showToggle?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 py-3.5">
      <div className="flex items-center justify-between mb-1.5">
        <div>
          <span className="text-kyomei-muted text-xs font-medium">{label}</span>
          {note && <span className="text-kyomei-light text-[10px] ml-1.5">{note}</span>}
        </div>
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className={cn(
              "flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full transition-colors",
              visible
                ? "text-kyomei-sage bg-kyomei-sage/10"
                : "text-kyomei-light bg-kyomei-border/50"
            )}
          >
            {visible
              ? <><Eye size={11} />公開</>
              : <><EyeOff size={11} />非公開</>
            }
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
