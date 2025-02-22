import { Button as ButtonUi } from "@/packages/ui/components/ui/Button";

export default function Button({
  onClick,
  buttonText,
  dark = false,
  unable = false,
  className = "",
  type = "button",
}: {
  onClick?: () => void;
  buttonText: string;
  dark?: boolean;
  unable?: boolean;
  className?: string;
  type?: "submit" | "button" | "reset";
}) {
  return (
    <ButtonUi
      className={`flex-1 h-full rounded-md ${dark || unable ? "ct-unable" : "ct-fill"} ${className}`}
      onClick={onClick && onClick}
      type={type}
    >
      <span className="text-headline text-white">{buttonText}</span>
    </ButtonUi>
  );
}
