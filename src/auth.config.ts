import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import prisma from "./lib/prisma";

export const { signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/authLogin",
    newUser: "auth/newUser",
    error: "/error",
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
        console.log(rest);
        return rest;
      },
    }),
  ],
});
