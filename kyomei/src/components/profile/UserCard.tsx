"use client";

import Link from "next/link";
import Image from "next/image";
import { User } from "@/types/user";
import { ValueTagList } from "./ValueTagList";
import { cn } from "@/lib/utils";

interface Props {
  user: User;
  className?: string;
}

export function UserCard({ user, className }: Props) {
  return (
    <Link href={`/profile/${user.id}`} className={cn("block", className)}>
      <div className="bg-kyomei-white rounded-3xl overflow-hidden border border-kyomei-border/40 hover:border-kyomei-sage/30 transition-all hover:shadow-sm">
        {/* 写真 */}
        <div className="relative aspect-[3/4] overflow-hidden bg-kyomei-border">
          <Image
            src={user.avatarUrl}
            alt={user.name}
            fill
            className="object-cover"
            sizes="(max-width: 390px) 50vw, 200px"
          />
          {/* オンライン表示 */}
          {user.isOnline && (
            <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-kyomei-sage rounded-full border-2 border-white" />
          )}
        </div>

        {/* 情報 */}
        <div className="p-3">
          <div className="flex items-baseline gap-1.5 mb-1.5">
            <span className="text-kyomei-dark font-medium text-sm">{user.name}</span>
            <span className="text-kyomei-muted text-xs">{user.age}</span>
          </div>
          <p className="text-kyomei-muted text-[11px] leading-relaxed mb-2 line-clamp-2">
            {user.tagline}
          </p>
          <ValueTagList tags={user.valueTags} max={2} size="sm" />
        </div>
      </div>
    </Link>
  );
}
