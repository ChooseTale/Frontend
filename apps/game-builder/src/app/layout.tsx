import "./styles.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MobileWrapper from "@repo/ui/components/MobileWrapper.tsx";
import TopNav from "@components/common/partial/TopNav";
import CSSThemeProvider from "@components/theme/CSSThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChooseTale",
  description: "이야기 만들기",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <MobileWrapper>
          <CSSThemeProvider>
            <TopNav />
            <div className="flex-1 flex flex-col">{children}</div>
          </CSSThemeProvider>
        </MobileWrapper>
      </body>
    </html>
  );
}
