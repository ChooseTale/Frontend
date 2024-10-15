import BackgroundWapper from "@/components/common/BackgroundWapper";
import MobileWrapper from "@/packages/ui/components/MobileWrapper";
import Landing from "@/components/temp/landing/Landing";

export default function Page(): JSX.Element {
  return (
    <MobileWrapper>
      <BackgroundWapper>
        <main className="h-full flex-1 flex items-center justify-center">
          <Landing />
          <div />
        </main>
      </BackgroundWapper>
    </MobileWrapper>
  );
}
