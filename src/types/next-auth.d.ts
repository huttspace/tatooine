import NextAuth, { DefaultUser } from "next-auth";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  type DefaultSessionUser = NonNullable<DefaultSession["user"]>;
  // TODO change name 'MyUser'
  type MyUser = DefaultSessionUser & { id: string; email: string };

  interface Session {
    user: MyUser;
  }
}
