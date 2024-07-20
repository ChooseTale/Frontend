import { CardDescription, CardTitle } from "@repo/ui/components/ui/Card.tsx";

export function StaticChoice({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <CardTitle className="mb-1 !text-[14px] p-[1px]">{title}</CardTitle>
      <CardDescription className="text-xs line-clamp-4 mb-0 p-[1px]">
        {description}
      </CardDescription>
    </>
  );
}
