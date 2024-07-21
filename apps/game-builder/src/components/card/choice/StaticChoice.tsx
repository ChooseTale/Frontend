import ThemedCard from "@/components/theme/ui/ThemedCard";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@repo/ui/components/ui/Card.tsx";
import DotIndicator from "./DotIndicator";
import ThemedIconButton from "@/components/theme/ui/ThemedIconButton";
import { Cross2Icon } from "@radix-ui/react-icons";
import { LinkedPageType } from "@/components/game/builder/GameBuilderContent";

export function StaticChoice({
  title = "title 없음",
  description = "description 없음",
  removeChoice,
  linkedPage,
}: {
  title: string;
  description: string;
  removeChoice: () => void;
  linkedPage: LinkedPageType | undefined;
}) {
  const clickRemove = () => {
    if (confirm("삭제 하시겠습니까?")) removeChoice();
  };

  return (
    <ThemedCard className="relative min-h-24 !ml-12" isChoice={true}>
      <DotIndicator isChoosen={true} linkedPage={linkedPage} />

      <div className="flex-1">
        <CardContent className="p-4 sm:p-6 h-full flex flex-col justify-center">
          <CardTitle className="mb-1 !text-[14px] p-[1px]">{title}</CardTitle>
          <CardDescription className="text-xs line-clamp-4 mb-0 p-[1px]">
            {description}
          </CardDescription>
        </CardContent>
      </div>

      <CardFooter className="flex items-center p-0 pr-4 pt-2 gap-1">
        <ThemedIconButton onClick={clickRemove}>
          <Cross2Icon className="h-8 w-8" />
        </ThemedIconButton>
      </CardFooter>
    </ThemedCard>
  );
}
