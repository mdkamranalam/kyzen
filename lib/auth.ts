import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Developer Login",
      credentials: {},
      async authorize() {
        try {
          console.log("Attempting to log in as Developer...");

          const user = await prisma.user.upsert({
            where: { email: "dev@kyzen.local" },
            update: {},
            create: {
              name: "Admin (Dev)",
              email: "dev@kyzen.local",
              image: "https://github.com/shadcn.png",
            },
          });

          console.log("User found/created successfully!");

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          console.error("Login Error: ", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
