import { notFound } from "next/navigation";
import ConfirmGame from "@/components/game/confirm/ConfirmGame";
import { getGameInfoById } from "@/actions/game/getGame";
import { getDictionary, type Locale } from "@/app/[lang]/dictionaries";
import LocaleProvider from "@/components/LocaleProvider";

export default async function Page({
  params,
}: {
  params: { id: string; locale: Locale };
}) {
  const { id, locale } = params;
  const gameId = Number(id);
  const gameInfoResponse = await getGameInfoById(gameId);

  if (isNaN(gameId) || !gameInfoResponse.success) {
    notFound();
  }
  const defaultLocale = "ko";
  const dict = await getDictionary(locale ?? defaultLocale);

  return (
    <div className="w-full px-12 pt-4 pb-10">
      <LocaleProvider dict={dict}>
        <ConfirmGame gameId={gameId} gameInfoData={gameInfoResponse.gameInfo} />
      </LocaleProvider>
    </div>
  );
}
