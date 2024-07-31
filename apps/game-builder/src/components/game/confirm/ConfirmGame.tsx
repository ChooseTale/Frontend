"use client";
import { useRouter } from "next/navigation";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import NextButton from "@components/button/SubmitButton";
import GameConfirmFields from "@/components/game/confirm/form/GameConfirmFields";
import type { GameInfo } from "@/interface/customType";

export default function ConirmGame({
  gameInfoData,
  gameId,
}: {
  gameInfoData: GameInfo;
  gameId: number;
}) {
  const router = useRouter();
  const useFormProps = useForm({ defaultValues: gameInfoData });
  const { handleSubmit, getValues } = useFormProps;

  const onSubmit: SubmitHandler<GameInfo> = (fieldValues) => {
    // eslint-disable-next-line no-console -- API 연결 전 form 작업
    console.log(gameId, fieldValues);
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col py-0 gap-6"
    >
      <GameConfirmFields {...useFormProps} />

      <div className="w-full flex">
        <NextButton
          text={getValues("isPrivate") ? "비공개 저장" : "퍼블리시"}
        />
      </div>
    </form>
  );
}
