import Image from "next/image";

export default function PlayerImages({
  profileIcons,
}: {
  profileIcons: string[];
}) {
  const placeholderSrc =
    "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80";

  const onError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = placeholderSrc;
  };

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
                onError={onError}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
