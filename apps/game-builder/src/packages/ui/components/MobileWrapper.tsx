"use client";
import { PropsWithChildren } from "react";
import NavBar from "./NavBar";

export default function MobileWrapper({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-[calc(100vh-1px)] flex bg-slate-200">
      <div className="non-mobile-layout hidden w-full h-full flex justify-center items-center bg-grey">
        <p className="text-xl text-center leading-relaxed">
          가로 화면은 지원하지 않습니다🥹 <br />
          세로 화면으로 전환해 주세요.
        </p>
      </div>
      <div className="mobile-layout max-w-5xl flex flex-col justify-between mx-auto">
        <div className="flex-1">{children}</div>
        <NavBar />
      </div>
    </div>
  );
}
