"use server";
import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";
import { object } from "zod";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    console.log(Object.fromEntries(formData));
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password, redirect: false });
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo iniciar Session",
    };
  }
};
