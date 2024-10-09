import Image from "next/image";
import { completeBadgeIcon } from "@/asset/icons";

export default function CompleteBadge({
  isHidden = false,
  className = "",
}: {
  isHidden?: boolean;
  className?: string;
}) {
  if (isHidden) return null;

  return (
    <div className={`relative w-[2.4rem] h-[2.4rem] ${className}`}>
      <Image src={completeBadgeIcon} fill alt="완료 뱃지" />
    </div>
  );
}
