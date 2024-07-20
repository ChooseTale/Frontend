"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CreateGameReqDto } from "@choosetale/nestia-type/lib/structures/CreateGameReqDto";

import { useGameStore } from "@/store/gameStore";
import { createGame } from "@/actions/game/createGame";
import NextButton from "@components/button/SubmitButton";
import GameCreateFields from "@/components/game/create/form/GameCreateFields";
import { ExtendsPageType } from "@/interface/page";

export default function CreateGame() {
  const router = useRouter();
  const { setGameInitData } = useGameStore();

  const useFormProps = useForm<CreateGameReqDto>();
  const { handleSubmit } = useFormProps;

  const onSubmit: SubmitHandler<CreateGameReqDto> = async (data) => {
    const res = await createGame(data);

    try {
      if (!res.success) throw new Error("게임 생성 실패");
      const gameId = res.gameInitData.id;
      if (!gameId) throw new Error("게임 생성 실패");

      router.push(`/game/builder/${gameId}`);
      setGameInitData(res.gameInitData as ExtendsPageType);
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
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
