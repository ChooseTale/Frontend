"use client";
import Image from "next/image";
import { socialGoogleButtonIcon } from "@/asset/icons";
import useSocialLogin from "../_hooks/useSocialLogin";

export default function SocialLogin() {
  const { sessionWhenLoggin, loginHandler, logoutHandler } = useSocialLogin();

  return (
    <div className="w-full h-1/3 pt-[1.875rem] flex justify-center">
      <button
        className={`mx-10 w-full max-w-[18.75rem] xs:scale-100 h-[3.125rem] rounded-lg cursor-pointer relative ${
          sessionWhenLoggin?.loggin ? "opacity-50 !cursor-default" : ""
        }`}
        onClick={sessionWhenLoggin?.loggin ? logoutHandler : loginHandler}
        type="button"
        aria-label="구글 로그인"
      >
        <Image
          src={socialGoogleButtonIcon}
          alt="Google Login"
          style={{ objectFit: "contain" }}
          fill
        />
      </button>
    </div>
  );
}
