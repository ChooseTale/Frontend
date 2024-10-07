import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full bg-white overflow-y-auto  bg-background-dark text-font-dark">
      <div className="h-24" />
      {children}
    </div>
  );
}
