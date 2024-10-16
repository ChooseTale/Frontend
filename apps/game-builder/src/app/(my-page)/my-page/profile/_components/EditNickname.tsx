"use client";
import { useState } from "react";
import Button from "@/components/common/button/Button";
import TextInput from "../../../../../components/common/input/TextInput";

export default function EditNickname() {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setError(null);
  };

  const handleSave = () => {
    if (nickname.length < 2) {
      setError("닉네임은 2자 이상이어야 합니다.");
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between px-6">
      <TextInput
        label="닉네임"
        placeholder="닉네임을 입력해주세요."
        value={nickname}
        onChange={handleNicknameChange}
        error={error}
        required
        maxCount={10}
        autoFocus
      />

      <div className="w-full h-[52px] flex">
        <Button buttonText="저장" onClick={handleSave} />
      </div>
    </div>
  );
}
