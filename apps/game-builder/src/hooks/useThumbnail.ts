import { useCallback, useState } from "react";
import type { useForm } from "react-hook-form";
import type { GameInfo } from "@/interface/customType";
import { uploadThumbnail } from "@/actions/thumbnail/uploadThumbnail";
import { deleteThumbnail } from "@/actions/thumbnail/deleteThumbnail";

export default function UseThumbnail({
  ...useFormProps
}: ReturnType<typeof useForm<GameInfo>>) {
  const { watch, setValue, getValues } = useFormProps;
  const [currentThumbnailIdx, setCurrentThumbnailIdx] = useState(0);

  // 이미지 업로드
  const handleUpload = useCallback(
    async (gameId: number, files: FileList) => {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });

      const response = await uploadThumbnail(gameId, formData);
      if (response.success) {
        const currentThumbnails = watch("thumbnails") || [];
        setValue("thumbnails", [
          ...currentThumbnails,
          ...response.uploadedThumbnail,
        ]);
        return true;
      }
    },
    [watch, setValue]
  );

  // AI 이미지 생성 요청 핸들러
  const handleGenerate = useCallback(
    async (gameId: number) => {
      // const response = await generateThumbnail(gameId);
      // if (response.success) {
      //   const currentThumbnails = watch("thumbnails") || [];
      //   // FIXME: url과 id 함께 받도록 api 변경 예정
      //   const newThumbnail = { id: -1, url: response.generatedThumbnailUrl };
      //   console.log(newThumbnail);
      //   setValue("thumbnails", [...currentThumbnails, newThumbnail]);
      // }
    },
    [watch, setValue]
  );

  // 썸네일 이미지 삭제 핸들러
  const handleDelete = useCallback(
    async (gameId: number, index: number) => {
      const imageId = getValues("thumbnails")[index].id;
      const response = await deleteThumbnail(gameId, imageId);

      if (response.success) {
        const currentThumbnails = watch("thumbnails") || [];
        const updatedThumbnails = currentThumbnails.filter(
          (_, i) => i !== index
        );
        setValue("thumbnails", updatedThumbnails);
      }
    },
    [watch, getValues, setValue]
  );

  return {
    handleUpload,
    handleGenerate,
    handleDelete,
    currentThumbnailIdx,
    setCurrentThumbnailIdx,
  };
}
