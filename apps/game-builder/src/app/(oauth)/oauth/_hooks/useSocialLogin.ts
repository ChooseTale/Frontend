import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { type SessionWhenLoggin } from "@/lib/next-auth/authOptions";

export default function useSocialLogin() {
  const router = useRouter();
  const { data: session } = useSession();
  const sessionWithCookie = session as SessionWhenLoggin;
  const isLoggin = session !== null && sessionWithCookie?.loggin;

  const loginHandler = async () => {
    if (isLoggin) return;
    await signIn("google");
  };

  const logoutHandler = async () => {
    document.cookie =
      "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    await signOut();
  };

  useEffect(() => {
    if (isLoggin) {
      router.push("/list");
    }
  }, [sessionWithCookie, router, isLoggin]);

  return {
    sessionWithCookie,
    isLoggin,
    loginHandler,
    logoutHandler,
  };
}
