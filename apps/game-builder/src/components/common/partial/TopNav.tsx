import BackButton from "@/components/button/BackButton";
import ThemeSelector from "@/components/theme/ThemeSelector";

export default function TopNav() {
  return (
    <div className="relative w-full h-14 px-6 flex justify-between items-center sticky top-0">
      <BackButton />
      <h4 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        새 이야기
      </h4>
      <ThemeSelector />
    </div>
  );
}
