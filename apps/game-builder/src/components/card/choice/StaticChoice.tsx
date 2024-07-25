import ThemedCard from "@/components/theme/ui/ThemedCard";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@repo/ui/components/ui/Card.tsx";
import DotIndicator from "./DotIndicator";
import ThemedIconButton from "@/components/theme/ui/ThemedIconButton";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { LinkedPageType } from "@/components/game/builder/GameBuilderContent";

export function StaticChoice({
  title = "title 없음",
  description = "description 없음",
  removeChoice,
  editChoice,
  linkedPage,
}: {
  title: string;
  description: string;
  removeChoice: () => void;
  editChoice: () => void;
  linkedPage: LinkedPageType | undefined;
}) {
  const onClickRemove = () => {
    if (confirm("삭제 하시겠습니까?")) removeChoice();
  };

  return (
    <ThemedCard className="relative min-h-24 !ml-12" isChoice={true}>
      <DotIndicator isChoosen={true} linkedPage={linkedPage} />

      <div className="flex-1">
        <CardContent className="p-4 sm:p-6 h-full flex flex-col justify-center">
          <CardTitle className="mb-1 !text-[14px] p-[1px] break-all">
            {title}
          </CardTitle>
          <CardDescription className="text-xs line-clamp-4 mb-0 p-[1px] break-all">
            {description}
          </CardDescription>
        </CardContent>
      </div>

      <CardFooter className="flex items-center p-0 pr-4 pt-2 gap-1">
        <ThemedIconButton
          onClick={editChoice}
          className="!absolute top-1 right-1 min-w-6 p-0 min-h-0 px-2 py-[2px]"
        >
          <Pencil2Icon className="h-4 w-4" />
        </ThemedIconButton>
        <ThemedIconButton onClick={onClickRemove}>
          <TrashIcon className="h-7 w-7 m-[2px]" />
        </ThemedIconButton>
      </CardFooter>
    </ThemedCard>
  );
}
