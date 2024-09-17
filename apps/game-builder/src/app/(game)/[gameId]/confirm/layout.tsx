export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full bg-white overflow-y-auto">{children}</div>
  );
}
