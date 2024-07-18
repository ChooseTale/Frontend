"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CreateGameReqDto } from "@choosetale/nestia-type/lib/structures/CreateGameReqDto";

import { useGameStore } from "@/store/gameStore";
import { createGame } from "@/actions/createGame";
import NextButton from "@components/button/SubmitButton";
import GameCreateFields from "@/components/game/create/form/GameCreateFields";

export default function CreateGame() {
  const router = useRouter();
  const { setGameInitData } = useGameStore();

  const useFormProps = useForm<CreateGameReqDto>();
  const { handleSubmit } = useFormProps;

  const onSubmit: SubmitHandler<CreateGameReqDto> = async (data) => {
    const res = await createGame(data);
    if (res.success) {
      router.push("/game/builder/" + (res.game.page.id ?? ""));
      setGameInitData(res.game);
    }

    if (!res.success) {
      alert("게임 생성 실패");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col justify-center gap-6"
    >
      <GameCreateFields {...useFormProps} />

      <div className="w-full flex">
        <NextButton text="다음으로" />
      </div>
    </form>
  );
}
