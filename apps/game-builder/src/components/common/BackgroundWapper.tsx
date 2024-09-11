import { type ReactNode } from "react";
import Image from "next/image";
import texture from "@asset/texture/paper.jpg";

export default function BackgroundWapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative w-full flex-1 px-12 pt-4 pb-10">
      <Image
        className="absolute w-full h-[calc(100%+4px)] -top-1 left-0 drag-none select-none pointer-events-none"
        src={texture.src}
        blurDataURL={texture.blurDataURL}
        placeholder="blur"
        alt=""
        width={400}
        height={900}
        quality={75}
        priority
      />
      <div className="relative">{children}</div>
    </div>
  );
}
