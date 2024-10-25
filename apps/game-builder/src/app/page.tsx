import MobileWrapper from "@/packages/ui/components/MobileWrapper";
import ImageWithError from "@/components/common/image/ImageWithError";
import splashImage from "@/asset/images/splash.png";

export default function Page() {
  return (
    <MobileWrapper>
      <main className="h-full flex-1 flex items-center justify-center bg-background-dark">
        <ImageWithError src={splashImage.src} alt="ChooseTale" priority />
      </main>
    </MobileWrapper>
  );
}
