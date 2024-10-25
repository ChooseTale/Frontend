import ImageWithError from "@/components/common/image/ImageWithError";
import SocialLogin from "./_components/SocialLogin";
import mainImage from "@/asset/images/main-image.png";

export default function Page() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="relative flex-1 w-full">
        <ImageWithError src={mainImage.src} alt="ChooseTale" />
      </div>
      <SocialLogin />
    </div>
  );
}
