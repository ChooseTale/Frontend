import "./styles.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/packages/ui/components/ui/Toaster";
import CSSThemeProvider from "@/components/theme/ThemeProvider";
import LocaleProvider from "@/components/LocaleProvider";
import SessionProvider from "@/components/SessionProvider";
import { getDictionary } from "./[lang]/dictionaries";
import AuthRedirect from "./_components/AuthRedirect";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChooseTale",
  description:
    "ChooseTale은 텍스트 기반의 게임을 만들고 공유할 수 있어요. AI와 함께 새로운 이야기를 만들어보세요!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultLocale = "ko";
  const dict = await getDictionary(defaultLocale);

  return (
    <html lang="ko">
      <body className={inter.className}>
        <SessionProvider>
          <AuthRedirect />
          <LocaleProvider dict={dict}>
            <CSSThemeProvider>
              <Toaster />
              {children}
            </CSSThemeProvider>
          </LocaleProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
