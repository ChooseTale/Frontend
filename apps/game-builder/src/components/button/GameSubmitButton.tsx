"use client";
import { RocketIcon } from "@radix-ui/react-icons";
import ThemedIconButton from "@themed/ThemedIconButton";

const GameSubmitButton = () => {
  return (
    <ThemedIconButton className="!absolute left-2 bottom-2 bg-green-500 rounded-sm z-[40] hover:animate-bounce">
      <RocketIcon className="h-5 w-5 m-1" color="white" />
    </ThemedIconButton>
  );
};

export default GameSubmitButton;
