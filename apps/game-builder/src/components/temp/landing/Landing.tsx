import Image from "next/image";
import logo from "@/asset/logo.png";
import LandingButtonBox from "./LandingButtonBox";

export default function Landing() {
  return (
    <div className="w-full max-w-80 px-4">
      <div className="flex flex-col items-center gap-4 mb-6">
        <Image
          src={logo.src}
          width={128}
          height={128}
          alt="로고"
          style={{ objectFit: "contain" }}
        />
        <h1 className="text-xl font-bold mb-6">ChooseTale</h1>
      </div>

      <div className="flex flex-col gap-3">
        <LandingButtonBox />
      </div>
    </div>
  );
}
