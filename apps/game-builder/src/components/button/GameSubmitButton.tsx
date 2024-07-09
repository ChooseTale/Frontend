import { RocketIcon } from "@radix-ui/react-icons";
import ThemedIconButton from "@themed/ThemedIconButton";

export default function GameSubmitButton({ theme }: { theme?: string }) {
  let themeClass;

  switch (theme) {
    case "old-game":
      themeClass = "is-success";
      break;
    default:
  }

  return (
    <ThemedIconButton
      className={`!absolute left-2 bottom-2 !bg-green-500 rounded-sm z-[40] hover:animate-bounce`}
      themeClass={themeClass}
      type="submit"
    >
      <RocketIcon className="h-5 w-5 m-1" color="#eeeeee" />
    </ThemedIconButton>
  );
}
