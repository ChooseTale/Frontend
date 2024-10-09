export default function GameIntroBadge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-2 py-[0.5rem] bg-grey-900 rounded-lg text-caption text-white font-light">
      {children}
    </div>
  );
}
