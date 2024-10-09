import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@repo/ui/components/ui/Card";
import type { LinkedPage } from "@/interface/customType";
import { removeEditorTags } from "@/utils/removeEditorTags";
import ThemedCard from "@/components/theme/ui/ThemedCard";
import ThemedIconButton from "@/components/theme/ui/ThemedIconButton";
import DotIndicator from "./DotIndicator";
import LinkedPageIndicator from "./LinkedPageIndicator";
import UnLinkedPageIndicator from "./UnLinkedPageIndicator";

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
  linkedPage: LinkedPage | undefined;
}) {
  const scrollToPage = (pageId: number) => {
    const pageElement = document.getElementById(`page-${pageId}`);
    if (pageElement) {
      pageElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pt-4">
      <ThemedCard className="relative min-h-24 !ml-12 mb-7" isChoice>
        <DotIndicator isChoosen />
        {linkedPage ? (
          <LinkedPageIndicator
            onClick={() => scrollToPage(linkedPage.pageId)}
            linkedPage={linkedPage}
          />
        ) : (
          <UnLinkedPageIndicator />
        )}

        <div className="flex-1">
          <CardContent className="p-4 sm:p-6 h-full flex flex-col justify-center">
            <CardTitle className="mb-1 !text-[14px] p-[1px] break-all">
              {title}
            </CardTitle>
            <CardDescription className="text-xs line-clamp-4 mb-0 p-[1px] break-all">
              {removeEditorTags(description)}
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
          <ThemedIconButton onClick={removeChoice}>
            <TrashIcon className="h-7 w-7 m-[2px]" />
          </ThemedIconButton>
        </CardFooter>
      </ThemedCard>
    </div>
  );
}
