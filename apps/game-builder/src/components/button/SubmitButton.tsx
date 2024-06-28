import { useFormStatus } from "react-dom";
import ThemedButton from "./ThemedButton";

export default function NextButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <ThemedButton className="w-full" type="submit" disabled={pending}>
      {text}
    </ThemedButton>
  );
}
