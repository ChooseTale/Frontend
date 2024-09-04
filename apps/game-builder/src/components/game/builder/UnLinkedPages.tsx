import { TrashIcon } from "@radix-ui/react-icons";
import type { PageType } from "@/interface/customType";
import type useGameData from "@/hooks/useGameData";
import { removeEditorTags } from "@/utils/removeEditorTags";
import ThemedIconButton from "@/components/theme/ui/ThemedIconButton";
import TextWithCounts from "@/components/common/text/TextWithCounts";
import GameEditDraw from "../edit/GameEditDraw";

export default function UnLinkedPages({
  gamePageList,
  updatePage,
  handleDeletePage,
}: {
  gamePageList: PageType[];
  updatePage: ReturnType<typeof useGameData>["updatePageData"];
  handleDeletePage: (pageId: number) => void;
}) {
  const unLinkedPagesList = gamePageList.filter((page) => page.depth === -1);
  if (!unLinkedPagesList.length) return;

  return (
    <div className="flex flex-col">
      <div className="-mt-5 mb-2">
        <TextWithCounts
          text="미연결 페이지"
          counts={unLinkedPagesList.length}
        />
      </div>
      <div className="relative w-full flex flex-col gap-2">
        {unLinkedPagesList.map((page) => (
          <div className="w-full relative" key={`un-linked-page-${page.id}`}>
            <div
              className="w-full rounded-md border px-3 py-2 !pr-20 border-[#22c55e] text-[#22c55e] bg-white shadow-sm"
              key={page.id}
            >
              <p className="w-full text-xs line-clamp-1">
                {page.abridgement
                  ? page.abridgement
                  : removeEditorTags(page.description)}
              </p>
            </div>

            <div className="absolute top-0 right-0">
              <ThemedIconButton
                className="absolute h-4 w-4 right-10 top-[6px]"
                onClick={() => handleDeletePage(page.id)}
              >
                <TrashIcon className="h-4 w-4" />
              </ThemedIconButton>
            </div>
            <GameEditDraw page={page} updatePage={updatePage} />
          </div>
        ))}
      </div>
      <div className="w-1/3 mx-auto mt-4 text-center border-[#49de7f] border-b-2 border-dashed" />
    </div>
  );
}
