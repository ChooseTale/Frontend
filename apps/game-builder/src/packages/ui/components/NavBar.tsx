"use client";
import { HomeIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Link } from "@radix-ui/react-navigation-menu";
import { NavigationMenu, NavigationMenuItem } from "./ui/NavigationMenu";

export default function NavBar() {
  return (
    <div className="w-full h-16 md:h-20 lg:h-24 shrink-0 bg-black">
      <NavigationMenu className="w-full h-full max-w-none px-8 md:px-10 lg:px-12">
        <ul className="w-full h-full flex justify-between items-center !mb-0">
          <NavigationMenuItem>
            <Link href="/">
              <HomeIcon
                height={24}
                width={24}
                color="white"
                className="m-2 w-6 h-6 lg:w-8 lg:h-8"
              />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/game/create">
              <Pencil2Icon
                height={24}
                width={24}
                color="white"
                className="m-2 w-6 h-6 lg:w-8 lg:h-8"
              />
            </Link>
          </NavigationMenuItem>
        </ul>
      </NavigationMenu>
    </div>
  );
}
