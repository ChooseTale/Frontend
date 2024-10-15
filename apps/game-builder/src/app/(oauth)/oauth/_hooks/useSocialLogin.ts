import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { type SessionWhenLoggin } from "@/app/api/auth/[...nextauth]/route";

export default function useSocialLogin() {
  const router = useRouter();
  const { data: session } = useSession();
  const sessionWithCookie = session as SessionWhenLoggin;
  const isDisabled = session !== null || sessionWithCookie?.loggin;

  const loginHandler = async () => {
    if (isDisabled) return;
    await signIn("google");
  };

  const logoutHandler = async () => {
    document.cookie =
      "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    await signOut();
  };

  useEffect(() => {
    if (sessionWithCookie?.loggin) {
      router.push("/list");
    }
  }, [sessionWithCookie, router]);

  return { sessionWithCookie, isDisabled, loginHandler, logoutHandler };
}
