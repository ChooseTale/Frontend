"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import LinkedButton from "@/components/common/button/LinkedButton";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error }: ErrorProps) {
  const isAuthError = error.message.includes("401");
  const router = useRouter();
  const pathname = usePathname();

  if (isAuthError && pathname !== "/oauth") {
    router.push("/oauth");
  }

  const ERROR = {
    DEFAULT_ERROR: {
      message: "Something went wrong 🥲",
      description:
        "예상치 못한 오류가 발생했습니다. <br /> 잠시 후 다시 시도해 주세요.",
    },
    AUTH_ERROR: {
      message: "로그인이 만료되었습니다.",
      description: "잠시 후 로그인 페이지로 이동합니다.",
    },
  };
  const currentError = isAuthError ? ERROR.AUTH_ERROR : ERROR.DEFAULT_ERROR;

  return (
    <ErrorWrapper
      message={currentError.message}
      description={currentError.description}
    >
      <LinkedButton
        to=".."
        buttonText="뒤로 가기"
        variant="ghost"
        className="w-full h-auto border border-b-2 border-black gap-2"
      />
      <LinkedButton
        to="/"
        buttonText="메인으로"
        variant="ghost"
        className="w-full h-auto border border-b-2 border-black gap-2"
      />
    </ErrorWrapper>
  );
}

function ErrorWrapper({
  message,
  description,
  children,
}: {
  message: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center flex-1 text-gray-900 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">Error</h1>
        <h2
          className="text-2xl font-semibold mb-4"
          dangerouslySetInnerHTML={{ __html: message }}
        />
        <p
          className="text-lg mb-8"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="flex gap-2 justify-center">{children}</div>
      </div>
    </div>
  );
}
