import { MouseEvent } from "react";
import { useFormStatus } from "react-dom";
import ThemedButton from "@themed/ThemedButton";

export default function NextButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (pending) event.preventDefault();
  };

  return (
    <ThemedButton
      className="w-full"
      type="submit"
      aria-disabled={pending}
      variant={pending ? "secondary" : "default"}
      onClick={handleClick}
    >
      {text}
    </ThemedButton>
  );
}
