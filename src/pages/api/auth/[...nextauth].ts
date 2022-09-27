import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "src/lib/prisma";

const DEFAULT_PROJECT_NAME = "Default Project";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: token.email ?? "" },
      });

      if (!existingUser) return token;

      return {
        id: existingUser.id,
        email: existingUser.email,
      };
    },
    async session({ session, token }) {
      return {
        ...session,
        user: { id: token.id, email: token.email },
      };
    },
  },
  events: {
    async createUser({ user }) {
      console.log("--------------call createuser -------------");
      console.log({ user });
      console.log("--------------call createuser -------------");
      if (!user) return;
      const project = await prisma.project.create({
        data: { name: DEFAULT_PROJECT_NAME },
      });

      await prisma.membership.create({
        data: {
          role: "ADMIN",
          projectId: project.id,
          userId: user.id,
        },
      });
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
});
