import { useContext } from "react";
import {
  LocaleContext,
  type LocaleContextType,
} from "@/components/LocaleProvider";

export function useTranslation() {
  const context = useContext(LocaleContext) as LocaleContextType;

  if (!context) {
    throw new Error("LocaleContext is not available");
  }

  const getValueByKeyPath = <T>(
    obj: T,
    keyPath: string
  ): string | undefined => {
    return keyPath.split(".").reduce((acc: unknown, key: string) => {
      if (acc && typeof acc === "object" && key in acc) {
        return acc[key as keyof typeof acc];
      }
      return undefined;
    }, obj) as string | undefined;
  };

  const t = (key: string): string => {
    const translation = getValueByKeyPath(context, key);
    if (!translation) {
      throw new Error(`Translation key "${key}" not found`);
    }

    return translation || key;
  };

  return { t };
}
