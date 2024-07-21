"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import NextButton from "@components/button/SubmitButton";
import GameConfirmFields from "@/components/game/confirm/form/GameConfirmFields";

export default function ConirmGame() {
  const [formData, setFormData] = useState({
    id: 1,
    title: "",
    description: "",
    genre: "FANTASY",
    thumbnails: [],
    isPrivate: true,
  });
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log(formData);

    e.preventDefault();
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
