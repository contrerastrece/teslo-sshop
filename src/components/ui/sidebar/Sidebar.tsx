"use client";
import { logout } from "@/actions";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);
  const { data: session } = useSession();
  const isAutenticated = !!session?.user;

  console.log(session);
  return (
    <div className="">
      {/* background */}
      {isSideMenuOpen && (
        <div className=" fixed top-0 left-0 w-screen h-screen z-10 bg-blue-950 opacity-50"></div>
      )}

      {/* blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeSideMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        ></div>
      )}
      {/* SideMenu */}

      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-full md:w-[300px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 overflow-y-auto",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={30}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeSideMenu()}
        />

        {/* input */}
        <div className="relative mt-10">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 pl-10 py-1 border-b-2 text-md border-gray200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menu */}
        <Link
          href="/profile"
          onClick={() => closeSideMenu()}
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoPersonOutline size={20} />
          <span className="ml-3 text-xl">Perfil</span>
        </Link>
        <Link
          href=""
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoTicketOutline size={20} />
          <span className="ml-3 text-xl">Ordenes</span>
        </Link>
        {!isAutenticated ? (
          <Link
            href="auth/login"
            className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => closeSideMenu()}
          >
            <IoLogInOutline size={20} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        ) : (
          <button
            className="flex  w-full items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => logout()}
          >
            <IoLogOutOutline size={20} />
            <span className="ml-3 text-xl">Salir</span>
          </button>
        )}

        {/* Line Separator  */}
        <div className="w-full h-px bg-gray-200 my-5"></div>
        <Link
          href=""
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoShirtOutline size={20} />
          <span className="ml-3 text-xl">Productos</span>
        </Link>
        <Link
          href=""
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoTicketOutline size={20} />
          <span className="ml-3 text-xl">Ordenes</span>
        </Link>

        <Link
          href=""
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoPeopleOutline size={20} />
          <span className="ml-3 text-xl">Usuarios</span>
        </Link>
      </nav>
    </div>
  );
};
