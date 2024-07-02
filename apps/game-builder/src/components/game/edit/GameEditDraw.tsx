"use client";
import { useState } from "react";
import { useThemeStore } from "@/store/useTheme";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@repo/ui/components/ui/Drawer.tsx";
import GameEditDrawTriggerButton from "./GameEditDrawTriggerButton";
import ThemedButton from "@/components/theme/ui/ThemedButton";
import GameEditFields from "@/components/game/edit/form/GameEditFields";

export default function GameEditDraw() {
  const [formData, setFormData] = useState({
    abridgement: "",
    description: "",
  });
  const { theme } = useThemeStore((state) => state);

  const updateGameEdit = () => {
    console.log(formData);
    console.log("업데이트 저장");
  };

  return (
    <Drawer>
      <GameEditDrawTriggerButton />

      <DrawerContent
        className={`h-[calc(100vh-3rem)] ${theme === "windows-98" ? "bg-[#c0c0c0]" : ""}`}
      >
        <div className="w-full max-w-xl h-full mx-auto px-6 flex flex-col gap-4">
          <DrawerHeader className="!px-0 !pt-4 !pb-0">
            <DrawerTitle>이야기 수정하기</DrawerTitle>
            <DrawerDescription className="!mb-0">
              어떤 내용을 수정할까요?
            </DrawerDescription>
          </DrawerHeader>

          <GameEditFields formData={formData} setFormData={setFormData} />

          <DrawerFooter className="flex flex-col !px-0 mb-6">
            <ThemedButton
              className="w-full is-success"
              type="submit"
              onClick={updateGameEdit}
            >
              저장하기
            </ThemedButton>
            <DrawerClose className="w-full px-0 text-sm py-2 underline">
              닫기
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
