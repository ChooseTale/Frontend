import { notFound } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";
import LocaleProvider from "@/components/LocaleProvider";
import TopNav from "@/components/common/partial/TopNav";
import ConfirmGame from "@/components/game/confirm/ConfirmGame";
import { getGameInfoById } from "@/actions/game/getGame";
import { GameParams } from "../page";

export default async function Page({ params }: { params: GameParams }) {
  const { gameId, locale } = params;
  const gameInfoResponse = await getGameInfoById(Number(gameId));

  if (isNaN(Number(gameId)) || !gameInfoResponse.success) {
    notFound();
  }
  const defaultLocale = "ko";
  const dict = await getDictionary(locale ?? defaultLocale);

  return (
    <>
      <TopNav title="새 게임" hasBackButton />
      <div className="w-full px-12 pt-4 pb-10">
        <LocaleProvider dict={dict}>
          <ConfirmGame
            gameId={Number(gameId)}
            gameInfoData={gameInfoResponse.gameInfo}
          />
        </LocaleProvider>
      </div>
    </>
  );
}
