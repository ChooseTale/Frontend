"use client";
import { type ChoosenPage } from "@/interface/customType";

export default function GamePlayChoosenPages({ page }: { page: ChoosenPage }) {
  return (
    <>
      <hr className="border-black my-4 pointer-none" />
      <h2 className="text-md font-bold mb-1">선택한 페이지:</h2>
      <ul>
        {page.choices.map((choice) => (
          <li key={choice.id} className="flex justify-between gap-2 mb-1">
            <span className="flex-1">{choice.title}</span>
            <span>{choice.percentage.toPrecision(1)}%</span>
          </li>
        ))}
      </ul>
      <hr className="border-black my-4 pointer-none" />
    </>
  );
}
