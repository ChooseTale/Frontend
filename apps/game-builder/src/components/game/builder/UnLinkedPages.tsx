import { TrashIcon } from "@radix-ui/react-icons";
import { PageType } from "@/interface/customType";
import useGameData from "@/hooks/useGameData";
import ThemedIconButton from "@/components/theme/ui/ThemedIconButton";
import GameEditDraw from "../edit/GameEditDraw";

export default function UnLinkedPages({
  gamePageList,
  updatePage,
  handleDeletePage,
}: {
  gamePageList: PageType[];
  updatePage: ReturnType<typeof useGameData>["updatePage"];
  handleDeletePage: (pageId: number) => void;
}) {
  const unLinkedPagesList = gamePageList.filter((page) => page.depth === -1);

  return (
    <div className="flex flex-col">
      <div className="flex gap-1 justify-end my-2">
        <h4 className="text-xs">미연결 페이지</h4>
        <div className="w-4 h-4 flex justify-center items-center rounded-full bg-green-400 text-white text-xs">
          3
        </div>
      </div>
      <div className="relative w-full flex flex-col gap-2">
        {[...unLinkedPagesList, ...unLinkedPagesList].map((page) => (
          <div className="w-full relative">
            <div
              className="w-full rounded-md border px-3 py-2 !pr-20 border-[#22c55e] text-[#22c55e] bg-white shadow-sm"
              key={page.id}
            >
              <p className="w-full text-xs">{page.abridgement}</p>
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
      <div className="text-center text-[10px] text-[#49de7f] mt-2">● ● ●</div>
    </div>
  );
}
