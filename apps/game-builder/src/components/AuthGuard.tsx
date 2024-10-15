"use client";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();

  if (
    (session.status === "unauthenticated" || session.data?.user === null) &&
    pathname !== "/oauth"
  ) {
    router.push("/oauth");
  }

  return <>{children}</>;
}
