"use client";
import { titleFont } from "@/config/fonts";
import { useUIStore } from "@/store";
import Link from "next/link";
import React from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* logo */}
      <div className="">
        <Link href={"/"}>
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span>| shop</span>
        </Link>
      </div>
      {/* center Menu */}
      <div className="hidden sm:block">
        <Link
          href={"/category/men"}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Hombres
        </Link>
        <Link
          href={"/category/women"}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Mujeres
        </Link>
        <Link
          href={"/category/kid"}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Niños
        </Link>
      </div>
      {/* Search, Cart, Menu */}
      <div className="flex items-center gap-5">
        <Link href={"/search"}>
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href={"/cart"}>
          <div className="relative">
            <span className="absolute text-xs rounded-full -top-2 -right-2 bg-blue-700 text-white px-1 font-bold">
              3
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button onClick={openSideMenu}>
          <div className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
            Menú
          </div>
        </button>
      </div>
    </nav>
  );
};
