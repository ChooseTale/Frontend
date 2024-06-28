import { Dispatch, SetStateAction } from "react";
import ThemedInputField from "@themed/ThemedInputField";
import ThemedTextareaField from "@themed/ThemedTextareaField";

interface GameFormProps<T> {
  formData: T;
  setFormData: Dispatch<SetStateAction<T>>;
}

export default function GameCreateForm<T extends Record<string, string>>({
  formData,
  setFormData,
}: GameFormProps<T>) {
  return (
    <>
      <ThemedInputField
        labelText="이야기"
        name="title"
        placeholder="이야기 이름"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, titles: e.target.value })}
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
