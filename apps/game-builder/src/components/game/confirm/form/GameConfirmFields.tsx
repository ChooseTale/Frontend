import { Dispatch, SetStateAction } from "react";
import { isBoolean, isString } from "@/utils/typeGuard";
import ThemedInputField from "@themed/ThemedInputField";
import ThemedTextareaField from "@themed/ThemedTextareaField";
import ThemedSwitch from "@themed/ThemedSwitch";
import ThemedCarousel from "../../../theme/ui/ThemedCarousel";
import ThemedSelectField from "../../../theme/ui/ThemedSelectField";
import ThemedIconButton from "../../../theme/ui/ThemedIconButton";
import { ImageIcon, TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import robotIcon from "@asset/icon/robot-solid.svg";
import ThemedLabel from "../../../theme/ui/ThemedLabel";
import ThemedCard from "../../../theme/ui/ThemedCard";

interface GameFieldsProps<T> {
  formData: T;
  setFormData: Dispatch<SetStateAction<T>>;
}

export default function GameConfirmFields<T extends Record<string, unknown>>({
  formData,
  setFormData,
}: GameFieldsProps<T>) {
  if (
    !isString(formData.title) ||
    !isString(formData.description) ||
    !isString(formData.genre) ||
    !isBoolean(formData.isPrivate)
  ) {
    return;
  }

  return (
    <>
      <ThemedInputField
        labelText="게임"
        name="title"
        placeholder="게임 제목"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <div className="flex flex-col gap-2">
        <ThemedLabel htmlFor="" labelText="썸네일" />
        <ThemedCard className="flex-col !py-4 gap-4">
          <ThemedCarousel />
          <div className="flex justify-center gap-1">
            <ThemedIconButton>
              <ImageIcon className="h-5 w-5 m-1" />
            </ThemedIconButton>
            <ThemedIconButton>
              <Image
                className="h-5 w-5 m-1 -translate-y-[2px]"
                src={robotIcon}
                alt="generate choice"
              />
            </ThemedIconButton>
            <ThemedIconButton>
              <TrashIcon className="h-5 w-5 m-1" />
            </ThemedIconButton>
          </div>
        </ThemedCard>
      </div>

      <ThemedSelectField
        labelText="게임 장르"
        name="genre"
        placeholder="장르"
        value={formData.genre}
        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
      />

      <ThemedTextareaField
        labelText="게임 소개"
        name="description"
        placeholder="게임의 내용을 소개해주세요"
        rows={6}
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      <div className="flex gap-4 justify-end items-center">
        <p className="mb-0 text-xs">게임을 비공개로 올릴까요?</p>
        <ThemedSwitch
          name={"isPrivate"}
          checked={formData.isPrivate}
          onCheckedChange={() =>
            setFormData({ ...formData, isPrivate: !formData.isPrivate })
          }
        />
      </div>
    </>
  );
}
