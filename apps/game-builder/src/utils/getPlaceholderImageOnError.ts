export const placeholderSrc =
  "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80";

export const getPlaceholderImageOnError = (
  e: React.SyntheticEvent<HTMLImageElement>
) => {
  const target = e.target as HTMLImageElement;
  target.src = placeholderSrc;
};
