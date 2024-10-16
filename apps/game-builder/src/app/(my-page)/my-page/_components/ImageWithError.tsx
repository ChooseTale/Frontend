"use client";
import { type SyntheticEvent, useState } from "react";
import Image from "next/image";
import { getPlaceholderImageOnError } from "@/utils/getPlaceholderImageOnError";

export default function ErrorHandlingImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [hasError, setHasError] = useState(false);
  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    if (hasError) return;
    setHasError(true);
    getPlaceholderImageOnError(e);
  };

  return (
    <div className="w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 600px) 80vw, 400px"
        style={{ objectFit: "cover" }}
        onError={handleImageError}
      />
    </div>
  );
}
