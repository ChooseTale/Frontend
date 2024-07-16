"use client";
import BackButton from "@/components/button/BackButton";
import { ReactNode } from "react";

export default function TopNav({
  title,
  hasBackButton = false,
  children,
}: {
  title: string;
  hasBackButton?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className={`w-full h-12 px-6 flex justify-between items-center sticky top-0 bg-[rgba(255,255,255,0.75)] backdrop-blur-lg transition-all z-[15]`}
    >
      <div>{hasBackButton && <BackButton />}</div>
      <h4 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {title}
      </h4>
      <div>{children}</div>
    </div>
  );
}
