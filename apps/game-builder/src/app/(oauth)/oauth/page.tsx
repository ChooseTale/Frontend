import Image from "next/image";
import { placeholderSrc } from "@/utils/getPlaceholderImageOnError";
import SocialLogin from "./_components/SocialLogin";

export default function Page() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="relative flex-1 w-full">
        <Image
          src={placeholderSrc}
          alt="ChooseTale"
          className="object-cover border select-none"
          fill
          priority
          sizes="(max-width: 600px) 80vw, 400px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <SocialLogin />
    </div>
  );
}
