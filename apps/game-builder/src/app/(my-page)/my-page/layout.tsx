import type { ReactNode } from "react";
import MobileWrapper from "@/packages/ui/components/MobileWrapper";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MobileWrapper>
      <div className="h-full w-full overflow-y-auto bg-background-dark text-font-dark">
        {children}
      </div>
    </MobileWrapper>
  );
}
