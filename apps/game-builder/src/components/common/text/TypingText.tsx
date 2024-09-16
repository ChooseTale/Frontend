"use client";
import { motion } from "framer-motion";

export interface TypingTextProps {
  text: string;
  speed?: "slow" | "normal" | "fast";
  initialDelay?: number;
  fontSize?: "sm" | "md" | "lg";
  className?: string;
}

export default function TypingText({
  text,
  initialDelay = 0,
  speed = "normal",
}: TypingTextProps) {
  const typingSpeed = {
    slow: 0.1,
    normal: 0.05,
    fast: 0.02,
  };
  const currentSpeed = typingSpeed[speed];
  const currentDelay = initialDelay;

  return (
    <>
      {text.split("").map((char, index) => (
        <motion.span
          // eslint-disable-next-line react/no-array-index-key -- Using index as key because content has no unique identifier
          key={char + index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: currentDelay + index * currentSpeed,
            duration: 0.001,
          }}
        >
          {char}
        </motion.span>
      ))}
    </>
  );
}
