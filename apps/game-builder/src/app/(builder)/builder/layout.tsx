import type { ReactNode } from "react";
import MobileWrapper from "@/packages/ui/components/MobileWrapper";
import TopNav from "@/app/(my-page)/my-page/_components/TopNav";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MobileWrapper>
      <div className="h-full w-full overflow-y-auto bg-background-dark text-font-dark">
        <div className="h-full flex flex-col">
          <TopNav title="빌더" />
          {children}
        </div>
      </div>
    </MobileWrapper>
  );
}
