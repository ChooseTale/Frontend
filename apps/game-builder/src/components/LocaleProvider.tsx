"use client";
import { createContext } from "react";
import { type GenreType } from "@/constants/genres";

export interface LocaleContextType {
  genre: {
    [K in GenreType]: string;
  };
}

export const LocaleContext = createContext<
  LocaleContextType | Record<string, never>
>({});

export default function LocaleProvider({
  dict,
  children,
}: {
  dict: LocaleContextType;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={dict}>{children}</LocaleContext.Provider>
  );
}
