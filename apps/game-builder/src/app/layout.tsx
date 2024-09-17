import "./styles.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/packages/ui/components/ui/Toaster";
import MobileWrapper from "@repo/ui/components/MobileWrapper.tsx";
import CSSThemeProvider from "@/components/theme/ThemeProvider";
import BackgroundWapper from "@/components/common/BackgroundWapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChooseTale",
  description:
    "ChooseTale은 텍스트 기반의 게임을 만들고 공유할 수 있어요. AI와 함께 새로운 이야기를 만들어보세요!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="ko">
      <body className={`overflow-hidden ${inter.className}`}>
        <Toaster />
        <CSSThemeProvider>
          <MobileWrapper>
            <BackgroundWapper>{children}</BackgroundWapper>
          </MobileWrapper>
        </CSSThemeProvider>
      </body>
    </html>
  );
}
