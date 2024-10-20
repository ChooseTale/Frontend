import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@repo/ui/components/ui/Carousel.tsx";
import { AspectRatio } from "@repo/ui/components/ui/AspectRatio.tsx";
import { useThemeStore } from "@/store/useTheme";
import { type Thumbnail } from "@/interface/customType";
import ErrorHandlingImage from "@/components/common/image/ImageWithError";

interface ThemedCarouselProps {
  thumbnails: Thumbnail[];
  setCurrentThumbnailId: Dispatch<SetStateAction<number>>;
  currentThumbnailIdx: number;
  mainThumbnailImageId: number;
  handleChangeMainThumbnailImageId: (id: number) => void;
}

export default function ThemedCarousel({
  thumbnails,
  setCurrentThumbnailId,
  currentThumbnailIdx,
  mainThumbnailImageId,
  handleChangeMainThumbnailImageId,
}: ThemedCarouselProps) {
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

  const [api, setApi] = useState<CarouselApi>();
  useEffect(() => {
    if (api) {
      const updateCurrentThumbnailId = () =>
        setCurrentThumbnailId(api.selectedScrollSnap());

      updateCurrentThumbnailId();

      api.on("select", updateCurrentThumbnailId);
      return () => {
        api.off("select", updateCurrentThumbnailId);
      };
    }
  });

  useEffect(() => {
    if (api && currentThumbnailIdx !== api.selectedScrollSnap())
      api.scrollTo(currentThumbnailIdx);
  }, [api, currentThumbnailIdx]);

  return (
    <Carousel setApi={setApi}>
      <CarouselContent className="mx-10">
        {thumbnails.map((thumbnail, idx) => (
          <CarouselItemWithOnError
            thumbnail={thumbnail}
            idx={idx}
            key={`thumbnail-${thumbnail.id}`}
            isMainThumbnailImageId={mainThumbnailImageId === thumbnail.id}
            onChangeMainThumbnailImageId={handleChangeMainThumbnailImageId}
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

function CarouselItemWithOnError({
  thumbnail,
  idx,
  isMainThumbnailImageId,
  onChangeMainThumbnailImageId,
}: {
  thumbnail: Thumbnail;
  idx: number;
  isMainThumbnailImageId: boolean;
  onChangeMainThumbnailImageId: (id: number) => void;
}) {
  return (
    <CarouselItem className="px-2">
      <AspectRatio ratio={9 / 9}>
        <div className="absolute w-full h-full">
          <ErrorHandlingImage
            src={thumbnail?.url}
            alt={`썸네일 이미지 ${thumbnail.id}`}
            priority={idx <= 1}
            hasErrorDisplay
          />
        </div>
        <div className="absolute right-0 p-3">
          <button
            onClick={() => onChangeMainThumbnailImageId(thumbnail.id)}
            type="button"
            className={`p-1 text-xs rounded-xl shadow-md ${
              isMainThumbnailImageId ? "!bg-green-400" : "!bg-white"
            }`}
          >
            <StarFilledIcon
              className="w-4 h-4"
              color={`${isMainThumbnailImageId ? "#ffffff" : "#aaaaaa"}`}
            />
          </button>
        </div>
      </AspectRatio>
    </CarouselItem>
  );
}
