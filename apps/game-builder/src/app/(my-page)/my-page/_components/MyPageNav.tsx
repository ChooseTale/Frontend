import Link from "next/link";
import TaleIcon from "@asset/icons/tale.svg";

export default function MyPageNav() {
  return (
    <nav className="flex flex-col gap-2 px-6">
      <Link href="/my-page/ended-game" className="h-12 flex items-center gap-3">
        <TaleIcon fill="white" className="w-5 h-5" viewBox="0 0 48 48" />
        <p className="text-headline text-white">내가 본 엔딩</p>
      </Link>
    </nav>
  );
}
