import { Dispatch, SetStateAction } from "react";
import { isString } from "@/utils/typeGuard";
import ThemedInputField from "@themed/ThemedInputField";
import ThemedTextareaField from "@themed/ThemedTextareaField";

interface GameFormProps<T> {
  formData: T;
  setFormData: Dispatch<SetStateAction<T>>;
}

export default function GameCreateForm<T extends Record<string, unknown>>({
  formData,
  setFormData,
}: GameFormProps<T>) {
  if (!isString(formData.title) || !isString(formData.pageOneContent)) {
    console.assert("GameCreateForm requires a title and pageOneContent");
    return;
  }

  return (
    <>
      <ThemedInputField
        labelText="게임"
        name="title"
        placeholder="게임의 이름"
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
