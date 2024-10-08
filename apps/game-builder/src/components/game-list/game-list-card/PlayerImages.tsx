import Image from "next/image";
import { getPlaceholderImageOnError } from "@/utils/getPlaceholderImageOnError";

export default function PlayerImages({
  profileIcons,
}: {
  profileIcons: string[];
}) {
  return (
    <div>
      <ul className="flex mr-2">
        {profileIcons.slice(0, 3).map((src) => (
          <li key={src} className="w-2">
            <div className="relative bg-gray-200 w-4 h-4 rounded-full overflow-hidden">
              <Image
                src={src}
                alt=""
                fill
                sizes="10px"
                style={{ objectFit: "cover" }}
                onError={getPlaceholderImageOnError}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
