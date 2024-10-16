"use client";
import { signOut } from "next-auth/react";
import { userLogOut } from "@/actions/user/userLogOut";

export default function FooterButtons() {
  const handleLogout = async () => {
    await userLogOut();
    document.cookie =
      "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    signOut();
  };

  const handleWithdrawal = async () => {
    // TODO: 회원탈퇴 기능 추가
  };

  return (
    <div className="flex gap-2 items-center justify-center gap-4 mt-10">
      <button
        className="text-body text-grey-500 text-thin"
        onClick={handleLogout}
        type="button"
      >
        로그아웃
      </button>
      <div className="w-[1px] h-[14px] bg-grey-500" />
      <button
        className="text-body text-grey-500 text-thin"
        onClick={handleWithdrawal}
        type="button"
      >
        회원탈퇴
      </button>
    </div>
  );
}
