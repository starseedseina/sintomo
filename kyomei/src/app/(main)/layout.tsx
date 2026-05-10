import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-kyomei-cream">
      <main className="pb-16">{children}</main>
      <BottomNavigation />
    </div>
  );
}
