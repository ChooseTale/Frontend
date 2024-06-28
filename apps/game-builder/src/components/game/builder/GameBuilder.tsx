import ChoiceCard from "@/components/card/choice/ChoiceCard";
import PageCard from "../../card/page/PageCard";
import StoryLine from "./StoryLine";
import GameSubmitButton from "@/components/button/GameSubmitButton";

export default function GameBuilder() {
  return (
    <div className="relative flex h-full px-6 pt-4">
      <StoryLine />
      <GameSubmitButton />

      <div className="flex-1 flex flex-col gap-4">
        <PageCard title="제목" description="dd" />
        <ChoiceCard title="선택지" description="dd" />
      </div>
    </div>
  );
}
