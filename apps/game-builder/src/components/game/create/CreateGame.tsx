"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createGame } from "@/actions/createGame";
import NextButton from "@components/button/SubmitButton";
import GameCreateFields from "@/components/game/create/form/GameCreateFields";
import { CreateGameReqDto } from "@choosetale/nestia-type/lib/structures/CreateGameReqDto";

export default function CreateGame() {
  const [formData, setFormData] = useState<CreateGameReqDto>({
    title: "",
    pageOneContent: "",
  });
  const router = useRouter();
  // const [errorMessage, dispatch] = useFormState(createGame, {});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createGame(formData);
    if (res.success) {
      router.push("/game/builder?id=" + res.game.page.id ?? "");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full h-full flex flex-col justify-center gap-6"
    >
      <GameCreateFields formData={formData} setFormData={setFormData} />

      <div className="w-full flex">
        <NextButton text="다음으로" />
      </div>
    </form>
  );
}
