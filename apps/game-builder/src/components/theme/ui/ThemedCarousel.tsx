import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "@radix-ui/react-icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/components/ui/Carousel.tsx";
import { AspectRatio } from "@repo/ui/components/ui/AspectRatio.tsx";
import { useThemeStore } from "@/store/useTheme";
import type { Thumbnail } from "@/interface/customType";

interface ThemedCarouselProps {
  thumbnails: Thumbnail[];
}

export default function ThemedCarousel({ thumbnails }: ThemedCarouselProps) {
  const { theme } = useThemeStore((state) => state);
  let themeClass;

  switch (theme) {
    case "old-game":
      themeClass = "nes-btn !m-0 !p-1";
      break;
    case "windows-98":
      themeClass = "rounded-none min-w-10 !bg-[#c0c0c0] z-10";
      break;
    default:
  }

  return (
    <Carousel>
      <CarouselContent className="mx-10">
        {thumbnails.map((thumbnail) => (
          <CarouselItemWithOnError
            thumbnail={thumbnail}
            key={`thumbnail-${thumbnail.id}`}
          />
        ))}
      </CarouselContent>
      <CarouselPrevious
        type="button"
        className={`translate-x-6 ${themeClass} !absolute`}
        style={{
          boxShadow:
            theme === "windows-98"
              ? "inset -1px -1px #0a0a0a,inset 1px 1px #fff,inset -2px -2px grey,inset 2px 2px #dfdfdf"
              : "",
        }}
      />
      <CarouselNext
        type="button"
        className={`-translate-x-6 ${themeClass} !absolute`}
        style={{
          boxShadow:
            theme === "windows-98"
              ? "inset -1px -1px #0a0a0a,inset 1px 1px #fff,inset -2px -2px grey,inset 2px 2px #dfdfdf"
              : "",
        }}
      />
    </Carousel>
  );
}

function CarouselItemWithOnError({ thumbnail }: { thumbnail: Thumbnail }) {
  const [src, setSrc] = useState(thumbnail.url);
  const [isError, setIsError] = useState(false);
  const placeholderSrc =
    "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80";

  const handleError = () => {
    setSrc(placeholderSrc);
    setIsError(true);
  };

  return (
    <CarouselItem>
      <AspectRatio ratio={16 / 9}>
        <Image
          src={src}
          alt="Image"
          className="rounded-md object-cover border"
          fill
          onError={handleError}
        />
        {isError && (
          <div className="absolute w-full h-full rounded-md border border-red-500 flex justify-center items-center">
            <ImageIcon className="w-10 h-10" color="#aaaaaa" />
            <div className="w-[42px] border-b-2 absolute border-[#aaaaaa] -rotate-45" />
          </div>
        )}
      </AspectRatio>
    </CarouselItem>
  );
}
