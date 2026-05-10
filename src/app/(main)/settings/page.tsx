"use client";

import { useRouter } from "next/navigation";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { useApp } from "@/context/AppContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const router = useRouter();
  const { currentUser, updatePrivacySettings } = useApp();
  const { privacySettings } = currentUser;

  const Toggle = ({
    enabled,
    onToggle,
  }: {
    enabled: boolean;
    onToggle: () => void;
  }) => (
    <button
      onClick={onToggle}
      className={cn(
        "relative w-12 h-6 rounded-full transition-colors duration-200 shrink-0",
        enabled ? "bg-kyomei-sage" : "bg-kyomei-border"
      )}
    >
      <div
        className={cn(
          "absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200",
          enabled ? "translate-x-7" : "translate-x-1"
        )}
      />
    </button>
  );

  return (
    <MobileContainer>
      {/* ヘッダー */}
      <header className="flex items-center px-4 h-14 bg-kyomei-white border-b border-kyomei-border sticky top-0 z-20">
        <button onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center">
          <ChevronLeft size={22} className="text-kyomei-dark" />
        </button>
        <h1 className="text-kyomei-dark font-medium text-base flex-1 text-center">プライバシー設定</h1>
        <div className="w-9" />
      </header>

      <div className="px-5 py-5 space-y-4">
        {/* オンライン状態 */}
        <div className="bg-kyomei-white rounded-3xl divide-y divide-kyomei-border/50 border border-kyomei-border/40 overflow-hidden">
          <div className="px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-kyomei-dark text-sm font-medium mb-1">オンライン状態の公開設定</p>
                <p className="text-kyomei-muted text-xs leading-relaxed">
                  あなたのオンライン中かどうかを他のユーザーに表示しますか？
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 mt-1">
                <span className="text-kyomei-muted text-xs">{privacySettings.showOnlineStatus ? "公開" : "非公開"}</span>
                <Toggle
                  enabled={privacySettings.showOnlineStatus}
                  onToggle={() =>
                    updatePrivacySettings({ showOnlineStatus: !privacySettings.showOnlineStatus })
                  }
                />
              </div>
            </div>
          </div>

          <div className="px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-kyomei-dark text-sm font-medium mb-1">最終ログインの公開設定</p>
                <p className="text-kyomei-muted text-xs leading-relaxed">
                  あなたの最終ログイン時間を他のユーザーに表示しますか？
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 mt-1">
                <span className="text-kyomei-muted text-xs">{privacySettings.showLastLogin ? "フォロー中のみ" : "非公開"}</span>
                <Toggle
                  enabled={privacySettings.showLastLogin}
                  onToggle={() =>
                    updatePrivacySettings({ showLastLogin: !privacySettings.showLastLogin })
                  }
                />
              </div>
            </div>
          </div>

          <div className="px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-kyomei-dark text-sm font-medium mb-1">既読機能</p>
                <p className="text-kyomei-muted text-xs leading-relaxed">
                  メッセージの既読を相手に表示します。
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 mt-1">
                <span className="text-kyomei-muted text-xs">{privacySettings.readReceipts ? "オン" : "オフ"}</span>
                <Toggle
                  enabled={privacySettings.readReceipts}
                  onToggle={() =>
                    updatePrivacySettings({ readReceipts: !privacySettings.readReceipts })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* プロフィール公開範囲 */}
        <div className="bg-kyomei-white rounded-3xl border border-kyomei-border/40 overflow-hidden">
          <div className="px-5 py-4">
            <p className="text-kyomei-dark text-sm font-medium mb-1">プロフィールの公開範囲</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-kyomei-muted text-sm">
                {privacySettings.profileVisibility === "all"
                  ? "すべてのユーザーに公開"
                  : privacySettings.profileVisibility === "connections"
                  ? "つながりのみ"
                  : "非公開"}
              </span>
              <ChevronRight size={16} className="text-kyomei-light" />
            </div>
          </div>
        </div>

        {/* その他設定 */}
        <div className="bg-kyomei-white rounded-3xl border border-kyomei-border/40 overflow-hidden divide-y divide-kyomei-border/50">
          {[
            "ブロック・通報管理",
            "通知設定",
          ].map((item) => (
            <button
              key={item}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="text-kyomei-dark text-sm">{item}</span>
              <ChevronRight size={16} className="text-kyomei-light" />
            </button>
          ))}
        </div>

        {/* ログアウト */}
        <button className="w-full py-4 rounded-2xl border border-red-200 text-red-400 text-sm font-medium">
          ログアウト
        </button>
      </div>
    </MobileContainer>
  );
}
