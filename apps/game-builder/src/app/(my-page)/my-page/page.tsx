import { me } from "@/actions/user/me";
import TopNav from "./_components/TopNav";
import UserProfile from "./_components/UserProfile";

export default async function Page() {
  const user = await me();

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col mx-5 pt-4">
      <TopNav title="마이페이지" hasBackButton page="/my-page" />
      <UserProfile user={user} />
    </div>
  );
}
