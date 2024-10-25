import MobileWrapper from "@/packages/ui/components/MobileWrapper";
import ImageWithError from "@/components/common/image/ImageWithError";
import splashImage from "@/asset/images/splash.png";

export default function Page() {
  return (
    <MobileWrapper>
      <div className="h-full flex-1 bg-background-dark">
        <div className="relative w-full h-full animate-pulse">
          <ImageWithError src={splashImage.src} alt="ChooseTale" priority />
        </div>
      </div>
    </MobileWrapper>
  );
}
