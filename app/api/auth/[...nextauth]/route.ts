import {
  getUserByEmail,
  validateUserLogin,
} from "@/src/services/accountService";
import { pushMessage } from "@/src/services/messageService";
import { MessageType } from "@/src/types";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const Auth = async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, {
    pages: {
      signIn: "/account/login",
      newUser: "/account/signin",
    },
    callbacks: {
      async session({ session, token, user }) {
        var userStatus = await getUserByEmail(user.email);

        session.user = {
          ...session.user,
          ...userStatus,
        };

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
          if (
            await validateUserLogin({
              email: credentials!.email,
              password: credentials!.password,
            })
          ) {
            var userStatus = await getUserByEmail(credentials!.email);
            if (userStatus) {
              if (userStatus.verified) {
                const user = {
                  id: `${userStatus!.id}`,
                  email: userStatus.email,
                };
                return user;
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
  });
};

export { Auth as GET, Auth as POST };
