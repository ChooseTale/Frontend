"use client";
import { type ChoosenPage } from "@/interface/customType";

export default function GamePlayChoosenPages({ page }: { page: ChoosenPage }) {
  return (
    <>
      <p className="font-bold mt-2 mb-4 keep-all">{page.abridgement}</p>
      <ul className="ml-10">
        {page.choices.map((choice) => (
          <li key={choice.id} className="flex justify-between gap-2 mb-1">
            <span className="flex-1">{choice.title}</span>
            <span>{(choice.percentage * 100).toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </>
  );
}
