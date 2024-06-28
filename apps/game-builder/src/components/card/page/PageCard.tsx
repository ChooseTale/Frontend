import Image from "next/image";
import { CardStackPlusIcon } from "@radix-ui/react-icons";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@repo/ui/components/ui/Card.tsx";
import ThemedCard from "@themed/ThemedCard";
import ThemedIconButton from "@themed/ThemedIconButton";
import DotIndicator from "./DotIndicator";
import robotIcon from "@asset/icon/robot-solid.svg";

interface PageCardProps {
  title: string;
  description: string;
}

export default function PageCard({ title, description }: PageCardProps) {
  return (
    <ThemedCard className="relative">
      <DotIndicator />

      <div className="min-h-24 flex-1">
        <CardContent className="p-4 sm:p-6 h-full flex flex-col justify-center">
          <CardTitle className="mb-1 !text-[16px]">{title}</CardTitle>
          <CardDescription className="text-xs line-clamp-4 mb-0">
            {description}
          </CardDescription>
        </CardContent>
      </div>

      <CardFooter className="flex items-center p-0 pr-4 pt-2 gap-1">
        <ThemedIconButton>
          <CardStackPlusIcon className="h-8 w-8" />
        </ThemedIconButton>
        <ThemedIconButton>
          <Image
            className="h-8 w-8 -translate-y-[2px]"
            src={robotIcon}
            alt="generate choice"
          />
        </ThemedIconButton>
      </CardFooter>
    </ThemedCard>
  );
}
