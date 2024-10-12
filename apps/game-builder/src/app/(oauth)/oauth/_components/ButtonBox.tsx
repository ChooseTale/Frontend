"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@/components/common/button/Button";

export default function ButtonBox() {
  const { data: session } = useSession();
  // console.log(session);

  return (
    <div className="flex flex-col gap-2">
      {session ? <div>로그인 되었습니다</div> : <div>로그인 해주세요</div>}
      {session ? <div>{session.user?.email}</div> : null}

      <Button
        buttonText="구글 로그인"
        unable={session !== null}
        onClick={() => signIn("google")}
      />
      <Button
        unable={session === null}
        buttonText="로그아웃"
        onClick={() => signOut()}
      />
    </div>
  );
}
