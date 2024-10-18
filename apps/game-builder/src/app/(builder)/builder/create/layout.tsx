import type { ReactNode } from "react";
import TopNav from "@/components/common/partial/TopNav";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full bg-white overflow-y-auto">
      <TopNav title="새 게임" />
      {children}
    </div>
  );
}
