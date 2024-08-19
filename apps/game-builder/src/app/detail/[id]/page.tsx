import { notFound } from "next/navigation";
import { getGameInfoById } from "@/actions/game/getGame";
import DetailGame from "@/components/game/detail/DetailGame";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const gameId = Number(id);
  const gameInfoResponse = await getGameInfoById(gameId);

  if (isNaN(gameId) || !gameInfoResponse.success) {
    notFound();
  }

  return (
    <div className="w-full px-12 pt-4 pb-10">
      <DetailGame gameId={gameId} gameInfoData={gameInfoResponse.gameInfo} />
    </div>
  );
}
