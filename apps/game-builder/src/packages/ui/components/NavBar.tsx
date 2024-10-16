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
    pathname === path ? "text-green-500" : "text-grey-500";
  const getIconColor = (path: string) =>
    pathname === path ? "#22c55e" : "#777777";

  return (
    <div className="w-full h-16 md:h-20 lg:h-24 shrink-0 bg-background-dark border-t border-grey-900">
      <NavigationMenu className="w-full h-full max-w-none px-8 md:px-10 lg:px-12">
        <ul className="w-full h-full flex justify-between items-center !mb-0">
          <NavigationMenuItem className="flex-1">
            <Link href="/list">
              <div className="flex flex-col items-center gap-1">
                <BookOpenIcon stroke={getIconColor("/list")} />
                <span className={`${getItemColor("/list")} text-caption`}>
                  게임
                </span>
              </div>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex-1">
            <Link href="/game/create">
              <div className="flex flex-col items-center gap-1">
                <EditIcon stroke={getIconColor("/game/create")} />
                <span
                  className={`${getItemColor("/game/create")} text-caption`}
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
