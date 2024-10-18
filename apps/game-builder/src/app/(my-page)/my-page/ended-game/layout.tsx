"use client";
import { useSearchParams } from "next/navigation";

export default function Layout({
  children,
  date,
  game,
}: {
  children: React.ReactNode;
  date: React.ReactNode;
  game: React.ReactNode;
}) {
  const searchParams = useSearchParams();

  return (
    <div className="h-full flex flex-col">
      {children}
      {searchParams.get("group") === "game" ? game : date}
    </div>
  );
}
