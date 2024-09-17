import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full px-12 pt-8 pb-12 overflow-y-auto">
      {children}
    </div>
  );
}
