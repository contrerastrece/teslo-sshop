import { titleFont } from "@/config/fonts";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-24 border border-red-600">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Nueva Cuenta</h1>

      <div className="flex flex-col">
        <label htmlFor="nombre">Nombre Completo</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="text"
        />

        <label htmlFor="email">Correo electrónico</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
        />

        <label htmlFor="email">Contraseña</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
        />

        <button className="btn-primary">Ingresar</button>

        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-400"></div>
          <div className="px-2 text-gray-600">O</div>
          <div className="flex-1 border-t border-gray-400"></div>
        </div>

        <Link href="/auth/login" className="btn-secondary text-center">
          Login
        </Link>
      </div>
    </div>
  );
}
