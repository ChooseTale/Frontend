import React from "react";
import LinkedButton from "@/components/common/button/LinkedButton";

export default function NotFoundPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center flex-1 text-gray-900 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found 🔍</h2>
        <p className="text-lg mb-8">
          찾으시는 페이지가 삭제되었거나 <br />
          이름이 변경되었거나
          <br />
          일시적으로 사용할 수 없습니다.
        </p>
        <LinkedButton
          to="/"
          buttonText="메인으로"
          variant="ghost"
          className="w-full h-auto border border-b-2 border-black gap-2"
        />
      </div>
    </div>
  );
}
