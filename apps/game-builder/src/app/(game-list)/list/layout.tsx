import type { ReactNode } from "react";
import Header from "./_components/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full overflow-y-auto bg-background-dark text-font-dark">
      <Header />
      {children}
    </div>
  );
}
