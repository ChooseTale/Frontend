import type { ReactNode } from "react";
import TopNav from "@/components/common/partial/TopNav";
import { NextButton } from "@/components/button/NextButton";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TopNav title="새 게임">
        <NextButton
          nextTo="/game/confirm"
          options={{ seachParams: { id: true } }}
        />
      </TopNav>
      {children}
    </>
  );
}
