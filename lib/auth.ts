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
      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: params.user.email,
          },
        });
        console.log(existingUser.id);
        if (!existingUser) {
          const user = await prisma.user.create({
            data: {
              email: params.user.email,
              name: params.user.name,
              provider: "GOOGLE",
              image: params.user.image,
            },
          });
          console.log(user.id);
        }
      } catch (e) {
        console.error(e);
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      return session;
    },
  },
};

export default NextAuth(authOptions);
