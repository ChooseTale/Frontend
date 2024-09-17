import { type ReactNode } from "react";
import Image from "next/image";
import texture from "@asset/texture/paper.jpg";

export default function BackgroundWapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={texture.src}
        sizes="100vw"
        alt="Background Texture"
        layout="fill"
        style={{ objectFit: "cover" }}
        priority
        quality={75}
      />
      <div className="relative w-full h-full z-10">{children}</div>
    </div>
  );
}
