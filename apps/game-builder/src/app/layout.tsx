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
            <div className="h-[calc(100vh-80px)] flex flex-col">
              <TopNav />
              <div className="flex-1 overflow-y-scroll">
                <div className="w-full h-full flex flex-col">{children}</div>
              </div>
            </div>
          </CSSThemeProvider>
        </MobileWrapper>
      </body>
    </html>
  );
}
