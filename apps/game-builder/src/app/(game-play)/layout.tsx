import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="w-full h-full px-12 py-8">{children}</div>;
}
