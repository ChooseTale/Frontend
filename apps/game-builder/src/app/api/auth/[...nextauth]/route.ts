import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { userLogOut } from "@/actions/user/userLogOut";
import { userLogin } from "@/actions/user/userLogIn";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      try {
        if (account) {
          const res = await userLogin(account);
          if (res.success) {
            const cookie = res.cookie?.[0];
            if (cookie) {
              cookies().set("naega-mandun-cookie", cookie, {
                path: "/",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 30 * 24 * 60 * 60, // 30 days
                sameSite: "lax",
              });
            }

            return true; // Return true to indicate success
          }
        }
        return false; // Return false if login failed
      } catch (error) {
        return false; // Handle errors and return false
      }
    },
  },
  events: {
    async signOut() {
      try {
        cookies().delete("naega-mandun-cookie");
        await userLogOut();
      } catch (error) {
        // console.error(error);
      }
    },
  },
});

export { handler as GET, handler as POST };
