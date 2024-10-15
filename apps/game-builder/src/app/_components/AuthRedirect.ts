"use client";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AuthRedirect() {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (session.status === "authenticated" && pathname === "/") {
    router.push("/list");
  } else if (session.status === "unauthenticated" && pathname !== "/oauth") {
    document.cookie =
      "connect.sid=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/oauth");
  }

  return null;
}
