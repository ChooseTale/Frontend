"use client";
import { type ChosenPage } from "@/interface/customType";

export default function GameResult({ page }: { page: ChosenPage }) {
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
