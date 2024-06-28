"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createGame } from "@app/action";
import NextButton from "../button/SubmitButton";
import ThemedInputField from "@themed/ThemedInputField";
import ThemedTextareaField from "@themed/ThemedTextareaField";

export default function NewGameForm() {
  const [formData, setFormData] = useState({ titles: "", pageOneContent: "" });
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createGame(formData);
    router.push("/game/builder");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full h-full flex flex-col justify-center py-10 gap-6"
    >
      <ThemedInputField
        labelText="이야기"
        name="title"
        placeholder="이야기 이름"
        onChange={(e) => setFormData({ ...formData, titles: e.target.value })}
      />

      <ThemedTextareaField
        labelText="이야기의 시작"
        name="pageOneContent"
        placeholder="첫 페이지의 내용"
        rows={12}
        onChange={(e) =>
          setFormData({ ...formData, pageOneContent: e.target.value })
        }
      />

      <div className="w-full flex">
        <NextButton text="다음으로" />
      </div>
    </form>
  );
}
