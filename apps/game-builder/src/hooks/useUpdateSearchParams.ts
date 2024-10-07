import { useRouter, useSearchParams } from "next/navigation";

export function useUpdateSearchParams() {
  const router = useRouter();
  const params = useSearchParams();

  const updateSearchParams = (key: string, value: string) => {
    const updatedParams = new URLSearchParams(params);
    updatedParams.set(key, value);
    router.push(`?${updatedParams.toString()}`);
  };

  return { updateSearchParams };
}
