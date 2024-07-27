import type { MouseEvent } from "react";
import ThemedButton from "@themed/ThemedButton";

export default function NextButton({ text }: { text: string }) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <ThemedButton className="w-full" type="submit" onClick={handleClick}>
      {text}
    </ThemedButton>
  );
}
