"use client";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button className="p-2" onClick={() => router.back()}>
      <ArrowLeftIcon className="h-5 w-5" />
    </button>
  );
};

export default BackButton;
