import { Dispatch, SetStateAction } from "react";
import { isString } from "@/utils/typeGuard";
import ThemedInputField from "@themed/ThemedInputField";
import ThemedTextareaField from "@themed/ThemedTextareaField";

interface GameFieldsProps<T> {
  formData: T;
  setFormData: Dispatch<SetStateAction<T>>;
}

export default function GameEditFields<T extends Record<string, unknown>>({
  formData,
  setFormData,
}: GameFieldsProps<T>) {
  if (!isString(formData.abridgement) || !isString(formData.description)) {
    console.assert("GameEditForm requires a title and description");
    return;
  }

  return (
    <>
      <ThemedInputField
        labelText="요약"
        name="abridgement"
        placeholder="플레이어에게는 보이지 않습니다"
        value={formData.abridgement}
        onChange={(e) =>
          setFormData({ ...formData, abridgement: e.target.value })
        }
      />

      <ThemedTextareaField
        labelText="내용"
        name="description"
        placeholder="페이지의 내용"
        rows={10}
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
    </>
  );
}
