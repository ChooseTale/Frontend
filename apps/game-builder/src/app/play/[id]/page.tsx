import Image from "next/image";
import { notFound } from "next/navigation";
import { getGameInfoById } from "@/actions/game/getGame";
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
      <section className="relative my-24 text-center">
        <h1 className="text-2xl mb-4">{gameInfoResponse.gameInfo.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: gameInfoResponse.gameInfo.description,
          }}
        />
      </section>
    </div>
  );
}
