import Image from "next/image";
import type { useForm } from "react-hook-form";
import { ImageIcon, TrashIcon } from "@radix-ui/react-icons";
import ThemedCarousel from "@themed/ThemedCarousel";
import ThemedIconButton from "@themed/ThemedIconButton";
import ThemedLabel from "@themed/ThemedLabel";
import ThemedCard from "@themed/ThemedCard";
import type { GameInfo } from "@/interface/customType";
import robotIcon from "@asset/icon/robot-solid.svg";
import useThumbnails from "@/hooks/useThumbnail";

export default function Thumbnails({
  ...useFormProps
}: ReturnType<typeof useForm<GameInfo>>) {
  const { watch } = useFormProps;
  const { handleUpload, handleGenerate, handleDelete } =
    useThumbnails(useFormProps);

  return (
    <div className="flex flex-col gap-2">
      <ThemedLabel htmlFor="" labelText="썸네일" />
      <ThemedCard className="flex-col !py-4 gap-4">
        <ThemedCarousel thumbnails={watch("thumbnails")} />

        <div className="flex justify-center gap-1">
          {/* 썸네일 이미지 업로드 */}
          <ThemedIconButton>
            <ImageIcon className="h-5 w-5 m-1" />
          </ThemedIconButton>

          {/* AI 이미지 생성 요청 */}
          <ThemedIconButton>
            <Image
              className="h-5 w-5 m-1 -translate-y-[2px]"
              src={robotIcon}
              alt="generate choice"
            />
          </ThemedIconButton>

          {/* 썸네일 이미지 삭제 */}
          <ThemedIconButton>
            <TrashIcon className="h-5 w-5 m-1" />
          </ThemedIconButton>
        </div>
      </ThemedCard>
    </div>
  );
}
