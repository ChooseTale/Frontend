import { Dispatch, SetStateAction, useState } from "react";
import { isBoolean, isString } from "@/utils/typeGuard";
import ThemedInputField from "@themed/ThemedInputField";
import ThemedTextareaField from "@themed/ThemedTextareaField";
import ThemedSwitch from "@themed/ThemedSwitch";
import ThemedCarousel from "@themed/ThemedCarousel";
import ThemedSelectField from "@themed/ThemedSelectField";
import ThemedLabel from "@themed/ThemedLabel";
import ThemedCard from "@themed/ThemedCard";
import ImageUpload from "../imageControl/ImageUpload";
import ImageDelete from "../imageControl/ImageDelete";
import ImageGenerate from "../imageControl/ImageGenerate";

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

  const thumbnails = (formData.thumbnails ?? []) as {
    id: number;
    url: string;
  }[];
  const [currentThumbIndex, setCurrentThumbIndex] = useState(
    thumbnails.length > 1 ? thumbnails.length - 1 : 0
  );
  const handleNewThumbnail = (url: string) => {
    const sortedThumbnails = thumbnails.sort((a, b) => a.id - b.id);
    let id = 0;
    sortedThumbnails.forEach((thumbnail, index) => {
      if (thumbnail.id !== index && id === index) {
        id = index;
      } else {
        id = index + 1;
      }
    });

    setFormData({
      ...formData,
      thumbnails: [...thumbnails, { id, url }],
    });
    setCurrentThumbIndex(thumbnails.length - 1);
  };

  const handleDeleteThumbnail = () => {
    const updatedThumbnails = thumbnails.filter(
      (thumbnail) => thumbnail.id !== currentThumbIndex
    );
    // console.log(currentThumbIndex);

    setFormData({
      ...formData,
      thumbnails: updatedThumbnails,
    });
  };

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
          <ThemedCarousel thumbnails={thumbnails} />
          <div className="flex justify-center gap-1">
            <ImageUpload onUpload={handleNewThumbnail} />
            <ImageGenerate onGenerate={handleNewThumbnail} />
            <ImageDelete onDelete={handleDeleteThumbnail} />
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
