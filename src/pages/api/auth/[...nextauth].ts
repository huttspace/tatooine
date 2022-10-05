import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { nanoid } from "nanoid";
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
        ...token,
        id: existingUser.id,
        email: existingUser.email,
      };
    },
    async session({ session, token }) {
      return {
        expires: session.expires,
        user: { ...session.user, id: token.id as string },
      };
    },
  },
  events: {
    async createUser({ user }) {
      if (!user) return;

      const project = await prisma.project.create({
        data: {
          name: DEFAULT_PROJECT_NAME,
          environments: {
            createMany: {
              skipDuplicates: true,
              data: [
                {
                  name: "Production",
                  production: true,
                  envKey: `env_${nanoid(10)}`,
                },
                {
                  name: "Staging",
                  production: false,
                  envKey: `env_${nanoid(10)}`,
                },
              ],
            },
          },
        },
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
  secret: process.env.NEXTAUTH_SECRET,
});
