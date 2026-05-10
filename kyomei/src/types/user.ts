export type ValueTag =
  | "瞑想"
  | "心理学"
  | "自己理解"
  | "宇宙法則"
  | "波動"
  | "エネルギー"
  | "食"
  | "自然療法"
  | "禅"
  | "ヨガ"
  | "哲学"
  | "ミニマリズム"
  | "感情理解"
  | "アート"
  | "詩"
  | "音楽"
  | "自然"
  | "読書"
  | "旅"
  | "創造性"
  | "内省"
  | "スピリチュアル"
  | "引き寄せ"
  | "マインドフルネス"
  | "感謝"
  | "シンプルライフ"
  | "カウンセリング"
  | "表現"
  | "アロマ"
  | "オーガニック"
  | "ヒーリング"
  | "自己成長"
  | "対話";

export interface DeepAnswer {
  questionId: string;
  questionText: string;
  answer: string;
}

export interface ProfileFieldVisibility {
  realName: boolean;
  displayName: boolean;
  age: boolean;
  gender: boolean;
  occupation: boolean;
  birthPrefecture: boolean;
  currentArea: boolean;
}

export interface User {
  id: string;
  name: string;
  age: number;
  location: string;
  occupation: string;
  avatarUrl: string;
  tagline: string;
  valueTags: ValueTag[];
  cherished: string;
  deepAnswers: DeepAnswer[];
  resonanceScore?: number;
  isOnline: boolean;
  lastSeenAt: string;
  joinedAt: string;
  // 編集可能な追加フィールド
  realName?: string;
  gender?: string;
  birthPrefecture?: string;
  currentArea?: string;
  fieldVisibility?: ProfileFieldVisibility;
  photos?: string[]; // 最大3枚（data URL or 外部URL）
  aboutMe?: string;           // 私について（性格など）
  idealConnection?: string;   // こんな方と繋がりたい
}

export interface PrivacySettings {
  showOnlineStatus: boolean;
  showLastLogin: boolean;
  readReceipts: boolean;
  profileVisibility: "all" | "connections" | "private";
}

export interface CurrentUser extends User {
  privacySettings: PrivacySettings;
}
