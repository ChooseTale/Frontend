"use client";
import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import BackButton from "@/components/common/button/BackButton";

export default function TopNav({
  title,
  left,
  right,
  hasBackButton = false,
  page,
}: {
  title: string;
  left?: ReactNode;
  right?: ReactNode;
  hasBackButton?: boolean;
  page?: string;
}) {
  const pathname = usePathname();
  const isLoot = page === pathname;
  const showBackButton = hasBackButton && !isLoot;

  return (
    <div className="relative h-12 flex justify-between items-center px-4">
      <div>
        {showBackButton && <BackButton className="invert" />}
        {left}
      </div>
      <h4 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-title1-md">
        {title}
      </h4>
      <div>{right}</div>
    </div>
  );
}
