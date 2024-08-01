import { useState } from "react";
import type { useForm } from "react-hook-form";
import {
  deleteThumbnail,
  generateThumbnail,
  uploadThumbnail,
} from "@/actions/game/uploadThumbnail";
import type { GameInfo } from "@/interface/customType";

export default function UseThumbnail({
  ...useFormProps
}: ReturnType<typeof useForm<GameInfo>>) {
  const { watch, setValue } = useFormProps;
  const [thumbnailId, setThumbnailId] = useState(0);

  const handleUpload = async (gameId: number) => {
    const uploadedThumbnail = await uploadThumbnail(gameId);
    if (uploadedThumbnail) {
      // const currentThumbnails = watch("thumbnails") || [];
      // setValue("thumbnails", [...currentThumbnails, uploadedThumbnail]);
    }
  };

  // AI 이미지 생성 요청 핸들러
  const handleGenerate = async (gameId: number) => {
    const generatedThumbnail = await generateThumbnail(gameId);
    if (generatedThumbnail) {
      // const currentThumbnails = watch("thumbnails") || [];
      // setValue("thumbnails", [...currentThumbnails, generatedThumbnail]);
    }
  };

  // 썸네일 이미지 삭제 핸들러
  const handleDelete = (gameId: number, imageId: number) => {
    deleteThumbnail(gameId, imageId);
    // const currentThumbnails = watch("thumbnails") || [];
    // const updatedThumbnails = currentThumbnails.filter((_, i) => i !== imageId);
    // setValue("thumbnails", updatedThumbnails);
  };

  return { handleUpload, handleGenerate, handleDelete };
}
