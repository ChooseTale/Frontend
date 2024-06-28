"use client";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import ThemedIconButton from "@themed/ThemedIconButton";

const BackButton = () => {
  const router = useRouter();

  return (
    <ThemedIconButton onClick={() => router.back()}>
      <ArrowLeftIcon className="h-5 w-5 m-2" />
    </ThemedIconButton>
  );
};

export default BackButton;
