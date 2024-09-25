"use client";
import { type ChoosenPage } from "@/interface/customType";

export default function GameResult({ page }: { page: ChoosenPage }) {
  return (
    <ul>
      {page.choices.map((choice) => (
        <li key={choice.id}>
          {choice.title} ({choice.percentage}%)
        </li>
      ))}
    </ul>
  );
}
