import "@repo/tailwind-config/globals.css";
import MobileWrapper from "@repo/ui/components/mobile-wrapper.tsx";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChooseTale",
  description: "game page description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MobileWrapper>{children}</MobileWrapper>
      </body>
    </html>
  );
}
