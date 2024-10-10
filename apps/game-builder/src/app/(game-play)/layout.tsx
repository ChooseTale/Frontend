import  { type ReactNode } from "react";
import MobileWrapper from "@/packages/ui/components/MobileWrapper";
import BackgroundWapper from "@/components/common/BackgroundWapper";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MobileWrapper>
      <BackgroundWapper>
        <div className="w-full h-full px-12 pt-8 pb-12 overflow-y-auto">
          {children}
        </div>
      </BackgroundWapper>
    </MobileWrapper>
  );
}
