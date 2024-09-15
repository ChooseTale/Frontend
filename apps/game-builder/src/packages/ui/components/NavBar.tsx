"use client";
import { Link } from "@radix-ui/react-navigation-menu";
import { AllSidesIcon, HomeIcon } from "@radix-ui/react-icons";
import penIcon from "@asset/icon/pen.png";
import { NavigationMenu, NavigationMenuItem } from "./ui/NavigationMenu";
import Image from "next/image";

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
              <Image
                src={penIcon}
                width={24}
                height={24}
                className="m-3 w-5 h-5 lg:w-7 lg:h-7 grow-0 shirnk-0 filter invert"
                alt="choice"
              />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/game/1/intro">
              <AllSidesIcon
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
