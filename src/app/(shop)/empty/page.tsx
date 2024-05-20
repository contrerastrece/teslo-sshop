import Link from "next/link";
import React from "react";
import { IoCartOutline } from "react-icons/io5";

const EmptyPage = () => {
  return (
    <div className="flex justify-center items-center h-[500px]">
      <IoCartOutline size={80} className="mx-5" />
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">Tu carrito Está vacío</h1>
        <Link href={'/'} className="text-blue-500 mt-2 text-4xl">Regresar</Link>
      </div>
    </div>
  );
};

export default EmptyPage;
