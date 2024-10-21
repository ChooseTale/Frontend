import Image from "next/image";
import completeBadgeIcon from "@/asset/images/complete-badge.png";
import completeBadgeAllIcon from "@/asset/images/complete-badge-all.png";

export default function CompleteBadge({
  reachedEndingPlayCount,
  totalEndingCount,
  className = "",
}: {
  reachedEndingPlayCount: number;
  totalEndingCount: number;
  className?: string;
}) {
  if (reachedEndingPlayCount === 0) return null;

  const isAllCleared = reachedEndingPlayCount === totalEndingCount;
  if (isAllCleared) {
    return (
      <Image src={completeBadgeAllIcon} alt="완료 배지" className={className} />
    );
  }

  return (
    <Image src={completeBadgeIcon} alt="완료 배지" className={className} />
  );
}
