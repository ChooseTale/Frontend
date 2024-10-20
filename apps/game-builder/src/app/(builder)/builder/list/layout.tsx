"use client";
import { useSearchParams } from "next/navigation";

export default function Layout({
  children,
  published,
  building,
}: {
  children: React.ReactNode;
  published: React.ReactNode;
  building: React.ReactNode;
}) {
  const searchParams = useSearchParams();

  return (
    <div className="relative h-full flex flex-col">
      {children}
      {searchParams.get("group") === "published" ? published : building}
    </div>
  );
}
