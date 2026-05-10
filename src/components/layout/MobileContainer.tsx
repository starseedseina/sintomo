import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function MobileContainer({ children, className }: Props) {
  return (
    <div className="min-h-screen bg-kyomei-cream flex justify-center">
      <div className={cn("w-full max-w-[390px] relative bg-kyomei-cream", className)}>
        {children}
      </div>
    </div>
  );
}
