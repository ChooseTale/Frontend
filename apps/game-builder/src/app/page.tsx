import BackgroundWapper from "@/components/common/BackgroundWapper";
import Landing from "@/components/game/landing/Landing";

export default function Page(): JSX.Element {
  return (
    <BackgroundWapper>
      <main className="h-full flex-1 flex items-center justify-center">
        <Landing />
        <div />
      </main>
    </BackgroundWapper>
  );
}
