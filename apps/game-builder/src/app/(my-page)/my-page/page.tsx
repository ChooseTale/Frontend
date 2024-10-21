import { me } from "@/actions/user/me";
import TopNav from "./_components/TopNav";
import UserProfile from "./_components/UserProfile";
import ContinuedGame from "./_components/ContinuedGame";
import FooterButtons from "./_components/Footer";
import MyPageNav from "./_components/MyPageNav";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await me();

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 flex flex-col">
        <TopNav title="마이페이지" hasBackButton page="/my-page" />
        <UserProfile user={user} />
        <ContinuedGame />
        <div className="h-3 bg-grey-900 mt-10 mb-3" />
        <MyPageNav />
      </div>
      <FooterButtons />
    </div>
  );
}
