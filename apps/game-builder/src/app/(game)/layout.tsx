import { type ReactNode } from "react";
import MobileWrapper from "@/packages/ui/components/MobileWrapper";

export default function Layout({ children }: { children: ReactNode }) {
  return <MobileWrapper>{children}</MobileWrapper>;
}
