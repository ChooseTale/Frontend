import type { ReactNode } from "react";
import MobileWrapper from "@/packages/ui/components/MobileWrapper";
import Gnb from "@/components/common/partial/Gnb";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MobileWrapper>
      <div className="h-full w-full overflow-y-auto bg-background-dark text-font-dark">
        <Gnb />
        {children}
      </div>
    </MobileWrapper>
  );
}
