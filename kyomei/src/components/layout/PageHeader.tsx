"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  title?: string;
  showBack?: boolean;
  rightAction?: ReactNode;
  transparent?: boolean;
  className?: string;
}

export function PageHeader({
  title,
  showBack = true,
  rightAction,
  transparent = false,
  className,
}: Props) {
  const router = useRouter();

  return (
    <header
      className={cn(
        "flex items-center justify-between px-4 h-14 z-10",
        transparent ? "absolute top-0 left-0 right-0" : "bg-kyomei-white border-b border-kyomei-border",
        className
      )}
    >
      <div className="w-10">
        {showBack && (
          <button
            onClick={() => router.back()}
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-full",
              transparent ? "bg-white/80 text-kyomei-dark" : "text-kyomei-dark hover:bg-kyomei-cream"
            )}
          >
            <ChevronLeft size={22} />
          </button>
        )}
      </div>
      {title && (
        <h1 className={cn("text-base font-medium tracking-wide", transparent ? "text-white" : "text-kyomei-dark")}>
          {title}
        </h1>
      )}
      <div className="w-10 flex justify-end">
        {rightAction ?? <div />}
      </div>
    </header>
  );
}
