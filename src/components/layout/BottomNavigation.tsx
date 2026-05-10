"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, MessageCircle, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMessages } from "@/context/MessagesContext";

const NAV_ITEMS = [
  { href: "/home", label: "探索", icon: Search },
  { href: "/messages", label: "対話", icon: MessageCircle },
  { href: "/connections", label: "つながり", icon: Users },
  { href: "/profile", label: "マイページ", icon: User },
];

export function BottomNavigation() {
  const pathname = usePathname();
  const { getUnreadCount } = useMessages();
  const unreadCount = getUnreadCount();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-kyomei-white border-t border-kyomei-border z-50">
      <div className="flex items-center justify-around h-16 px-2 pb-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          const isMessages = href === "/messages";
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-colors min-w-0",
                isActive ? "text-kyomei-sage" : "text-kyomei-muted"
              )}
            >
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2 : 1.5}
                />
                {isMessages && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-red-400 rounded-full text-white text-[10px] flex items-center justify-center font-medium">
                    {unreadCount}
                  </span>
                )}
              </div>
              <span className={cn("text-[10px] font-medium", isActive ? "text-kyomei-sage" : "text-kyomei-light")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
