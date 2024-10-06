import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  callback: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

export default function useInfiniteScroll({
  callback,
  isLoading,
  hasMore,
}: UseInfiniteScrollOptions) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          callback();
        }
      },
      { threshold: 1.0 }
    );
    const currentRef = observerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [callback, isLoading, hasMore]);

  return observerRef;
}
