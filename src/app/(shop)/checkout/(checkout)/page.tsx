import { Title } from "@/components";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ProductInCart } from "./ui/ProductInCart";
import { PlaceOrder } from "./ui/PlaceOrder";

const CartPage = () => {
  return (
    <div className="flex justify-center items-center mb-72 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={"Verificar Orden"} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* carrito */}

          <div className="flex flex-col mt-5 gap-3">
            <span>Ajustar Elementos</span>
            <Link href={"/cart"} className="underline mb-5">
              Editar Carrito
            </Link>

            {/* Items */}
            <ProductInCart />
          </div>
          {/* Sumary | CheckOut */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
