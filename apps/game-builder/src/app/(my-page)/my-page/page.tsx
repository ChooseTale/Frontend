import { me } from "@/actions/user/me";
import { getContinuedGame } from "@/actions/my-page/getContinuedGame";
import TopNav from "./_components/TopNav";
import UserProfile from "./_components/UserProfile";
import ContinuedGame from "./_components/ContinuedGame";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await me();
  const continuedGame = await getContinuedGame({
    page: 1,
    limit: 10,
    genre: "ALL",
    order: "LATEST",
  });

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col pt-4">
      <TopNav title="마이페이지" hasBackButton page="/my-page" />
      <UserProfile user={user} />
      <ContinuedGame
        continuedGame={[...continuedGame, ...continuedGame, ...continuedGame]}
      />
      <div className="h-3 bg-grey-900 mt-10 mb-3" />
    </div>
  );
}
