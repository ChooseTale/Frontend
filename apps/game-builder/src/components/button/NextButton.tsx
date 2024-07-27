"use client";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import ThemedIconButton from "@themed/ThemedIconButton";

export function NextButton({
  nextTo,
  options,
}: {
  nextTo: string;
  options?: { seachParams: Record<string, boolean> };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  let queryString = "";

  for (const key in options?.seachParams) {
    const match = searchParams.get(key);

    if (match !== null) {
      if (queryString === "") queryString = "?";
      queryString += `${key}=${match}`;
    }
  }

  return (
    <ThemedIconButton
      className="my-1"
      onClick={() => router.push(nextTo + queryString)}
    >
      <ArrowRightIcon className="h-5 w-5 m-1" />
    </ThemedIconButton>
  );
}
