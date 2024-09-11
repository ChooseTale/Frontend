import { useEffect, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { GamePlayPage } from "@/interface/customType";
import { getGamePlayPage } from "@/actions/game-play/getGamePlayPage";
import penIcon from "@asset/icon/pen.png";
import { DynamicViewer } from "@/components/common/viewer/DynamicViewer";
import { postGamePlayChoice } from "@/actions/game-play/postGamePlayChoice";

export default function PlayPage({
  gameId,
  pageId,
}: {
  gameId: number;
  pageId: number;
}) {
  const [currentPageId, setCurrentPageId] = useState(pageId);
  const [gamePlayResponse, setGamePlayResponse] = useState<GamePlayPage | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [choiceSending, setChoiceSending] = useState(false);

  useEffect(() => {
    async function startGame() {
      setLoading(true);
      try {
        const response = await getGamePlayPage(gameId, currentPageId);

        response.success && setGamePlayResponse(response.gamePlayPage);
      } catch (error) {
        return notFound();
      } finally {
        setLoading(false);
      }
    }

    startGame();
  }, [gameId, currentPageId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!gamePlayResponse) notFound();
  const page = gamePlayResponse?.page[0];

  const handleChoiceClick = async (choiceId: number) => {
    if (choiceSending) return;
    setChoiceSending(true);
    try {
      const response = await postGamePlayChoice(gameId, choiceId);
      if (!response.success) {
        throw new Error(response.error.message);
      }
      const nextPageId = response.gamePlay.page?.id;
      nextPageId && setCurrentPageId(nextPageId);
    } catch (error) {
      return notFound();
    } finally {
      setChoiceSending(false);
    }
  };

  return (
    <>
      <div className="pt-6 pb-8">
        <DynamicViewer
          initialEditType="markdown"
          previewStyle="vertical"
          height="600px"
          initialValue={page.description}
        />
      </div>

      <div>
        <div className="flex justify-center my-8">~~~</div>
        <ul
          className={`flex flex-col gap-4 ${choiceSending ? "animate-false" : ""}`}
        >
          {page.choices.map((choice, index) => (
            <ol className="flex gap-1 hover:font-bold" key={choice.id}>
              <Image
                src={penIcon}
                width={16}
                height={16}
                className="mt-1 w-4 h-4 grow-0 shirnk-0"
                alt="choice"
              />
              <button
                type="button"
                className="text-left"
                onClick={() => handleChoiceClick(choice.id)}
              >
                {choice.description}
              </button>
            </ol>
          ))}
        </ul>
      </div>
    </>
  );
}
