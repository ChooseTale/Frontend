"use client";
import { useRouter } from "next/navigation";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { UpdateGameReqDto } from "@choosetale/nestia-type/lib/structures/UpdateGameReqDto";
import type { GameInfo } from "@/interface/customType";
import { updateGame } from "@/actions/game/updateGame";
import { isValueEmpty } from "@/components/common/editor/contant";
import SubmitButton from "@components/common/button/SubmitButton";
import GameConfirmFields from "@/app/(game)/[gameId]/confirm/_components/form/GameConfirmFields";

export default function ConfirmGame({
  gameInfoData,
  gameId,
}: {
  gameInfoData: GameInfo;
  gameId: number;
}) {
  const router = useRouter();
  const useFormProps = useForm({
    defaultValues: {
      ...gameInfoData,
      thumbnailImageId: gameInfoData.thumbnails[0]?.id ?? -1,
    },
  });
  const { handleSubmit, watch, setError } = useFormProps;

  const onSubmit: SubmitHandler<GameInfo> = async (fieldValues) => {
    const { title, description, genre, isPrivate, thumbnailImageId } =
      fieldValues;

    if (isValueEmpty(description)) {
      setError("description", {
        type: "required",
        message: "페이지 내용을 입력해주세요",
      });
      return;
    }

    const payload: UpdateGameReqDto = {
      title,
      description,
      genre,
      isPrivate,
      thumbnailImageId,
    };
    const res = await updateGame(payload, gameId);

    if (res.success) {
      router.push(`/game/${gameId}/intro`);
    } else {
      alert(res.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col py-0 gap-6"
    >
      <GameConfirmFields {...useFormProps} />

      <div className="w-full flex">
        <SubmitButton
          text={watch("isPrivate") ? "비공개 저장" : "게임 게시하기"}
        />
      </div>
    </form>
  );
}
