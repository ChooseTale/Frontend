import type { ReactNode } from "react";
import BackgroundWapper from "@/components/common/BackgroundWapper";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <BackgroundWapper>
      <div className="w-full h-full px-12 pt-8 pb-12 overflow-y-auto">
        {children}
      </div>
    </BackgroundWapper>
  );
}
