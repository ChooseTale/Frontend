"use client";
import { usePathname } from "next/navigation";
import { Link } from "@radix-ui/react-navigation-menu";
import BookOpenIcon from "@asset/icons/book-open.svg";
import EditIcon from "@asset/icons/edit.svg";
import UserIcon from "@asset/icons/user.svg";
import { NavigationMenu, NavigationMenuItem } from "./ui/NavigationMenu";

export default function NavBar() {
  const pathname = usePathname();
  const getItemColor = (path: string) =>
    pathname.includes(path) ? "text-green-500" : "text-grey-500";
  const getIconColor = (path: string) =>
    pathname.includes(path) ? "#22c55e" : "#777777";

  return (
    <div className="w-full h-[4rem] shrink-0 bg-background-dark border-t border-grey-900">
      <NavigationMenu className="w-full h-full max-w-none px-8 md:px-10 lg:px-12">
        <ul className="w-full h-full flex justify-between items-center !mb-0">
          <NavigationMenuItem className="flex-1">
            <Link href="/game-list">
              <div className="flex flex-col items-center gap-1">
                <BookOpenIcon stroke={getIconColor("/game-list")} />
                <span className={`${getItemColor("/game-list")} text-caption`}>
                  게임
                </span>
              </div>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex-1">
            <Link href="/builder/list">
              <div className="flex flex-col items-center gap-1">
                <EditIcon
                  stroke={getIconColor("/builder/list")}
                  className="ml-[1px]"
                />
                <span
                  className={`${getItemColor("/builder/list")} text-caption`}
                >
                  빌더
                </span>
              </div>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex-1">
            <Link href="/my-page">
              <div className="flex flex-col items-center gap-1">
                <UserIcon stroke={getIconColor("/my-page")} />
                <span className={`${getItemColor("/my-page")} text-caption`}>
                  마이
                </span>
              </div>
            </Link>
          </NavigationMenuItem>
        </ul>
      </NavigationMenu>
    </div>
  );
}
