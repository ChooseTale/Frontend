import { Dispatch, SetStateAction } from "react";
import ThemedInputField from "@themed/ThemedInputField";
import ThemedTextareaField from "@themed/ThemedTextareaField";
import { CreateGameReqDto } from "@choosetale/nestia-type/lib/structures/CreateGameReqDto";

interface GameFieldsProps<T> {
  formData: T;
  setFormData: Dispatch<SetStateAction<T>>;
}

export default function GameCreateFields({
  formData,
  setFormData,
}: GameFieldsProps<CreateGameReqDto>) {
  return (
    <>
      <ThemedInputField
        labelText="게임"
        name="title"
        placeholder="게임의 이름"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <ThemedTextareaField
        labelText="이야기의 시작"
        name="pageOneContent"
        placeholder="첫 페이지의 내용"
        rows={12}
        value={formData.pageOneContent}
        onChange={(e) =>
          setFormData({ ...formData, pageOneContent: e.target.value })
        }
      />
    </>
  );
}
