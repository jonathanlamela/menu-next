import { getUserByEmail, validateLogin } from "@/src/services/accountService";
import { pushMessage } from "@/src/services/messageService";
import { MessageType } from "@/src/types";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/signin",
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      var userStatus = await getUserByEmail(token!.email!);

      token.role = userStatus?.role;

      return token;
    },
    async session({ session, token, user }: any) {
      var userStatus = await getUserByEmail(token!.email);

      session.user = userStatus;
      //session.user.role = userStatus?.role;

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Email e password",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (await validateLogin(credentials!.email, credentials!.password)) {
          var userStatus = await getUserByEmail(credentials!.email);
          if (userStatus) {
            if (userStatus.verified) {
              pushMessage({
                text: `Bentornato ${userStatus.firstname} ${userStatus.lastname} `,
                type: MessageType.SUCCESS,
              });

              return userStatus as any;
            }
            pushMessage({
              text: "Il tuo account non è attivo",
              type: MessageType.INFO,
            });
            return null;
          } else {
            return null;
          }
        } else {
          pushMessage({
            text: "Email o password errata",
            type: MessageType.ERROR,
          });
          return null;
        }
      },
    }),
  ],
};

export default options;
