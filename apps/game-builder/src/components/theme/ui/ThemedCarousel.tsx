import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/components/ui/Carousel.tsx";
import { AspectRatio } from "@repo/ui/components/ui/AspectRatio.tsx";
import Image from "next/image";
import { useThemeStore } from "@/store/useTheme";

export default function ThemedCarousel({ thumbnails }: { thumbnails: any[] }) {
  const { theme } = useThemeStore((state) => state);
  let themeClass;
  const ratio = 4 / 3;

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
    <>
      <Carousel>
        <CarouselContent className="mx-10">
          {thumbnails.length === 0 && (
            <CarouselItem>
              <AspectRatio ratio={ratio}>
                <Image
                  src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                  alt="Photo by Drew Beamer"
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </CarouselItem>
          )}
          {thumbnails.reverse().map((thumbnail) => (
            <CarouselItem key={thumbnail.id}>
              <AspectRatio ratio={ratio}>
                <Image
                  src={thumbnail.url}
                  alt="Image"
                  className="rounded-md object-cover border"
                  fill
                />
              </AspectRatio>
            </CarouselItem>
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
    </>
  );
}
