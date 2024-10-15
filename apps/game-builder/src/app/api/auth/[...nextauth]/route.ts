import { cookies } from "next/headers";
import NextAuth, {
  type NextAuthOptions,
  type Account,
  type Session,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { userLogin } from "@/actions/user/userLogIn";

type AccountWhenLoggin = Account & { loggin: boolean };
export type SessionWhenLoggin = Session & { loggin: boolean };

const nextAuthOptions: NextAuthOptions = {
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
          if (!res.success || !res.cookie) {
            return false;
          }

          const connectSidCookie = res.cookie[0];
          if (connectSidCookie) {
            cookies().set(
              "connect.sid",
              connectSidCookie
                .replace("connect.sid=", "")
                .replace("connect.sid%3D", "")
            );
            (account as AccountWhenLoggin).loggin = true;
          }
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    jwt({ token, account }) {
      if (account) {
        token.loggin = account.loggin;
      }
      return token;
    },
    session({ session, token }) {
      return { ...session, loggin: token.loggin } as SessionWhenLoggin;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
