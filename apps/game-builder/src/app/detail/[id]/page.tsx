import Image from "next/image";
import { notFound } from "next/navigation";
import { getGameInfoById } from "@/actions/game/getGame";
import DetailGame from "@/components/game/detail/DetailGame";
import texture from "@asset/texture/paper.jpg";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const gameId = Number(id);
  const gameInfoResponse = await getGameInfoById(gameId);

  if (isNaN(gameId) || !gameInfoResponse.success) {
    notFound();
  }

  return (
    <div className="relative w-full flex-1 px-12 pt-4 pb-10">
      <Image
        className="absolute w-full h-[calc(100%+4px)] -top-1 left-0 drag-none select-none pointer-events-none"
        src={texture.src}
        blurDataURL={texture.blurDataURL}
        placeholder="blur"
        alt=""
        width={400}
        height={900}
        quality={75}
        priority
      />
      <DetailGame gameId={gameId} gameInfoData={gameInfoResponse.gameInfo} />
    </div>
  );
}
