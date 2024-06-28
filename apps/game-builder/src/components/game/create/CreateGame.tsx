"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createGame } from "@app/action";
import NextButton from "@components/button/SubmitButton";
import GameCreateForm from "@/components/form/GameCreateForm";

export interface PageType {
  title: string;
  description: string;
}

export default function CreateGame() {
  const [formData, setFormData] = useState({ titles: "", pageOneContent: "" });
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createGame(formData);
    router.push("/game/builder");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full h-full flex flex-col justify-center py-10 gap-6"
    >
      <GameCreateForm formData={formData} setFormData={setFormData} />

      <div className="w-full flex">
        <NextButton text="다음으로" />
      </div>
    </form>
  );
}
