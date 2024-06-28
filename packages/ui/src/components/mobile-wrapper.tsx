"use client";
import { PropsWithChildren } from "react";
import NavBar from "./nav-bar";

export default function MobileWrapper({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-screen bg-slate-200">
      <div className="max-w-xl h-full flex flex-col justify-between mx-auto">
        {children}
        <NavBar />
      </div>
    </div>
  );
}
