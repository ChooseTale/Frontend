import { placeholderSrc } from "@/utils/getPlaceholderImageOnError";
import ErrorHandlingImage from "@/components/common/image/ImageWithError";
import SocialLogin from "./_components/SocialLogin";

export default function Page() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="relative flex-1 w-full">
        <ErrorHandlingImage src={placeholderSrc} alt="ChooseTale" />
      </div>
      <SocialLogin />
    </div>
  );
}
