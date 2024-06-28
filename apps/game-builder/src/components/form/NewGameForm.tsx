"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@repo/ui/components/ui/input.tsx";
import { Label } from "@repo/ui/components/ui/label.tsx";
import { Textarea } from "@repo/ui/components/ui/textarea.tsx";
import { createGame } from "@app/action";
import NextButton from "../button/SubmitButton";

export default function NewGameForm() {
  const [formData, setFormData] = useState({ titles: "", pageOneContent: "" });
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createGame(formData);
    router.push("/game/builder");
  };

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">이야기</Label>
        <Input
          name="title"
          placeholder="이야기 이름"
          onChange={(e) => setFormData({ ...formData, titles: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <Label htmlFor="pageOneContent">이야기의 시작</Label>
        <Textarea
          name="pageOneContent"
          placeholder="첫 페이지의 내용"
          rows={10}
          onChange={(e) =>
            setFormData({ ...formData, pageOneContent: e.target.value })
          }
        />
      </div>

      <div className="w-full flex">
        <NextButton text="다음으로" />
      </div>
    </form>
  );
}
