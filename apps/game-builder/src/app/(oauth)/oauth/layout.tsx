import type { ReactNode } from "react";
import Gnb from "@/components/common/partial/Gnb";
import MobileWrapper from "@/packages/ui/components/MobileWrapper";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MobileWrapper hasNavBar={false}>
      <div className="h-full w-full overflow-y-auto bg-background-dark text-font-dark">
        <Gnb />
        {children}
      </div>
    </MobileWrapper>
  );
}
