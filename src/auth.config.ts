import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import prisma from "./lib/prisma";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
    error: "/error",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      return true;
    },
    jwt({ token, user }) {
      // console.log({token, user})
      // añadimos la los datos del usuarioa a data en token
      if (user) {
        token.data = user;
      }
      return token;
    },
    session({ session, token, user }) {
      // console.log({ session, token, user });
      session.user = token.data as any;
      return session;
    },
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // console.log({ email, password });
        // buscar por correo
        const user = await prisma?.user.findUnique({
          where: { email: email.toLocaleLowerCase() },
        });

        if (!user) return null;

        // Comparar contraseña
        if (!bcryptjs.compareSync(password, user.password)) return null;

        // Regresar el Usuario sin la contraseña
        const { password: _, ...rest } = user;
        // console.log(rest);
        return rest;
      },
    }),
  ],

  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
