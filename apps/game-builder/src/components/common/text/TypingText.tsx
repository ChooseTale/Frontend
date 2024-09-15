"use client";
import { motion } from "framer-motion";

interface TypingTextProps {
  text: string;
  initialDelay?: number;
}

export default function TypingText({
  text,
  initialDelay = 1,
}: TypingTextProps) {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: initialDelay, duration: 0.1 }}
      >
        <motion.div
          className="typing-cursor absolute bottom-0 left-0 w-3 h-[2px] mt-auto mb-1 bg-black"
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 0.25,
            repeatDelay: 0.25,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      </motion.div>

      <p className="text-lg">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: initialDelay + index * 0.05,
              duration: 0.001,
            }}
          >
            {char}
          </motion.span>
        ))}
      </p>
    </div>
  );
}
