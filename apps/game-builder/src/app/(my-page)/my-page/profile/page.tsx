import { me } from "@/actions/user/me";
import TopNav from "../_components/TopNav";
import EditProfileImage from "./_components/EditProfileImage";
import EditNickname from "./_components/EditNickname";

export default async function Page() {
  const user = await me();

  return (
    <div className="h-full flex flex-col pb-20">
      <TopNav title="프로필 수정" hasBackButton page="/my-page" />
      <EditProfileImage user={user} />
      <EditNickname />
    </div>
  );
}
