"use client";
import { ButtonProps } from "@repo/ui/components/ui/Button.tsx";
import ThemedButton from "@/components/theme/ui/ThemedButton";
import Link from "next/link";

interface LinkedButton extends ButtonProps {
  buttonText: string;
  to: string;
}

export default function LinkedButton({
  buttonText,
  to,
  ...props
}: LinkedButton) {
  return (
    <Link href={to}>
      <ThemedButton {...props}>{buttonText}</ThemedButton>
    </Link>
  );
}
