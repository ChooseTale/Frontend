"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { userLogOut } from "@/actions/user/userLogOut";
import ConfirmModal from "./Confirm";

export default function FooterButtons() {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);

  const handleLogout = async () => {
    await userLogOut();
    document.cookie =
      "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    signOut();
    setIsLogoutOpen(false);
  };

  const handleWithdrawal = () => {
    // TODO: 회원탈퇴 기능 추가
    setIsWithdrawalOpen(false);
  };

  return (
    <div className="flex gap-2 items-center justify-center gap-4 mt-10">
      <button
        className="text-body text-grey-500 font-normal"
        onClick={() => setIsLogoutOpen(true)}
        type="button"
      >
        로그아웃
      </button>
      <ConfirmModal
        isOpen={isLogoutOpen}
        title="로그아웃하시겠어요?"
        description="로그아웃해도 정보는<br/>사라지지 않습니다."
        buttonText="로그아웃"
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutOpen(false)}
      />

      <div className="w-[1px] h-[14px] bg-grey-500" />

      <button
        className="text-body text-grey-500 font-normal"
        onClick={() => setIsWithdrawalOpen(true)}
        type="button"
      >
        회원탈퇴
      </button>
      <ConfirmModal
        isOpen={isWithdrawalOpen}
        title="탈퇴하시겠어요?"
        description="탈퇴한 계정은 복구가<br/>불가합니다."
        buttonText="탈퇴하기"
        onConfirm={handleWithdrawal}
        onCancel={() => setIsWithdrawalOpen(false)}
      />
    </div>
  );
}
