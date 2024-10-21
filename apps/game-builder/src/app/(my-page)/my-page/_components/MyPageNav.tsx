import Link from "next/link";
import CheckCircledIcon from "@asset/icons/chevron-right.svg";

export default function MyPageNav() {
  return (
    <nav className="flex flex-col gap-2 px-6">
      <Link
        href="/my-page/ended-game"
        className="text-title1 h-12 flex items-center justify-between gap-3"
      >
        <p className="text-headline text-white">내가 본 엔딩</p>
        <CheckCircledIcon stroke="#a4a4a4" />
      </Link>
    </nav>
  );
}
