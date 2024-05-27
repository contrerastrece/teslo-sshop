"use client";
import { titleFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const TotalItems = useCartStore((state) => state.getTotalItems());
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
  }, []);

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
          href={"/gender/men"}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Hombres
        </Link>
        <Link
          href={"/gender/women"}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Mujeres
        </Link>
        <Link
          href={"/gender/kid"}
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
            {load && TotalItems > 0 && (
              <span className="absolute text-xs rounded-full -top-2 -right-2 bg-blue-700 text-white px-1 font-bold">
                {TotalItems}
              </span>
            )}
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
