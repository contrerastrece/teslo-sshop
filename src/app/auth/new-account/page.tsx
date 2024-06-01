import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { RegisterAccout } from "./ui/RegisterAccout";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-24">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Nueva Cuenta</h1>

      <RegisterAccout />
    </div>
  );
}
