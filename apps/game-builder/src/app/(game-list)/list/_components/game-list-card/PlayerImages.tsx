import ImageWithError from "@/components/common/image/ImageWithError";

export default function PlayerImages({
  gamePlayerImageUrls,
}: {
  gamePlayerImageUrls: string[];
}) {
  return (
    <div>
      <ul className="flex mr-2">
        {gamePlayerImageUrls.slice(0, 3).map((src) => (
          <li key={src} className="w-2">
            <div className="relative bg-gray-200 w-4 h-4 rounded-full overflow-hidden">
              <ImageWithError src={src} alt="" sizes="10px" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
