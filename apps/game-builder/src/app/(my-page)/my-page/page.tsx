import TopNav from "./_components/TopNav";

export default function Page() {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col mx-5 pt-4">
      <TopNav title="마이페이지" hasBackButton page="/my-page" />
    </div>
  );
}
