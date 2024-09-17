import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ApiChoice } from "@/interface/customType";
import { TextAlignTopIcon } from "@radix-ui/react-icons";
import penIcon from "@asset/icon/pen.png";

interface PlayPageProps {
  choiceSending: boolean;
  choices: ApiChoice[];
  handleChoiceClick: (choiceId: number) => void;
  pageLength: number;
}

export default function PlayChoices({
  choiceSending,
  choices,
  handleChoiceClick,
  pageLength,
}: PlayPageProps) {
  const [skip, setSkip] = useState(false);
  const initialDelay = 0.015 * pageLength;

  return (
    <>
      {skip ? (
        <StaticChoices
          choices={choices}
          handleChoiceClick={handleChoiceClick}
        />
      ) : (
        <>
          <div className="flex justify-end">
            <TextAlignTopIcon
              onClick={() => setSkip(true)}
              onTouchStart={() => setSkip(true)}
              className="cursor-pointer"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: initialDelay + 0.2 }}
          >
            <hr className="border-black my-8 pointer-none" />
            <ol
              className={`flex flex-col gap-4 ${choiceSending ? "animate-false pointer-events-none" : ""}`}
            >
              {choices.map((choice, index) => (
                <motion.li
                  className="flex gap-1 hover:underline"
                  key={choice.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: initialDelay + 1 + 0.25 * index,
                  }}
                >
                  <Image
                    src={penIcon}
                    width={16}
                    height={16}
                    className="mt-1 w-4 h-4 grow-0 shirnk-0"
                    alt="choice"
                  />
                  <button
                    type="button"
                    className="text-left"
                    onClick={() => handleChoiceClick(choice.id)}
                  >
                    {choice.description}
                  </button>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </>
      )}
    </>
  );
}

function StaticChoices({
  choices,
  handleChoiceClick,
}: {
  choices: ApiChoice[];
  handleChoiceClick: (choiceId: number) => void;
}) {
  return (
    <>
      <hr className="border-black my-8 pointer-none" />
      <ol className="flex flex-col gap-4">
        {choices.map((choice) => (
          <li className="flex gap-1 hover:underline" key={choice.id}>
            <Image
              src={penIcon}
              width={16}
              height={16}
              className="mt-1 w-4 h-4 grow-0 shirnk-0"
              alt="choice"
            />
            <button
              type="button"
              className="text-left"
              onClick={() => handleChoiceClick(choice.id)}
            >
              {choice.description}
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}
