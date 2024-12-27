import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn(params) {
      console.log(params);
      try {
        const user = await prisma.user.create({
          data: {
            email: params.user.email,
            name: params.user.name,
            provider: "GOOGLE",
            image: params.user.image,
          },
        });
        console.log(user);
      } catch (e) {
        console.error(e);
      }
      return true;
    },
  },
};

export default NextAuth(authOptions);
