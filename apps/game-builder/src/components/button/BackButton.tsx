"use client";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import ThemedIconButton from "@themed/ThemedIconButton";

const BackButton = () => {
  const router = useRouter();

  return (
    <>
      <ThemedIconButton onClick={() => router.back()}>
        <ArrowLeftIcon className="absolute h-5 w-5 left-[0.6rem] top-1/2 -translate-y-1/2 pointer-events-none" />
      </ThemedIconButton>
    </>
  );
};

export default BackButton;
