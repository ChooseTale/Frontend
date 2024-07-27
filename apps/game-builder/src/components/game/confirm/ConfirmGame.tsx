"use client";
import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NextButton from "@components/button/SubmitButton";
import GameConfirmFields from "@/components/game/confirm/form/GameConfirmFields";

export default function ConirmGame() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "FANTASY",
    thumbnailImageId: 0,
    isPrivate: true,
  });
  const router = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col py-0 gap-6">
      <GameConfirmFields formData={formData} setFormData={setFormData} />

      <div className="w-full flex">
        <NextButton text={formData.isPrivate ? "비공개 저장" : "퍼블리시"} />
      </div>
    </form>
  );
}
