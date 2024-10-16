import Link from "next/link";
import Image from "next/image";
import { User } from "@/interface/customType";
import profilePlaceholder from "@asset/images/profile-placeholder.svg?url";
import ChevronDownIcon from "@asset/icons/chevron-right.svg";

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  const imageUrl = user.profileImage.url ?? profilePlaceholder;

  return (
    <div className="h-60 flex flex-col items-center justify-center">
      <Image
        src={imageUrl}
        alt="profile"
        width={84}
        height={84}
        className="w-21 h-21 rounded-[1.125rem] bg-gray-300 mb-4"
        priority
        style={{ objectFit: "cover" }}
      />
      <Link href="/my-page/profile">
        <div className="flex flex-col gap-1 items-center">
          <div className="text-title font-semibold flex gap-1 items-center">
            {user.nickname}

            <div className="relative w-0">
              <ChevronDownIcon stroke="#777777" />
            </div>
          </div>
          <p className="text-body text-grey-400">{user.email}</p>
        </div>
      </Link>
    </div>
  );
}
