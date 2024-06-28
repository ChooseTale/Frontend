import { Dispatch, SetStateAction } from "react";
import ThemedInputField from "@themed/ThemedInputField";
import ThemedTextareaField from "@themed/ThemedTextareaField";

interface GameFormProps<T> {
  formData: T;
  setFormData: Dispatch<SetStateAction<T>>;
}

export default function GameEditForm<T extends Record<string, string>>({
  formData,
  setFormData,
}: GameFormProps<T>) {
  return (
    <>
      <ThemedInputField
        labelText="이야기"
        name="title"
        placeholder="제목"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <ThemedTextareaField
        labelText="내용"
        name="description"
        placeholder="이야기 내용"
        rows={12}
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
    </>
  );
}
