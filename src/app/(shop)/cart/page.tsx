import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Title } from "@/components";
// import { initialData } from "@/seed/seed";
import { ProductInCart } from "./ui/ProductInCart";
import { OrderSumary } from "./ui/OrderSumary";
// const productsInCart = [
//   initialData.products[0],
//   initialData.products[1],
//   initialData.products[2],
// ];

const CartPage = () => {
  // redirect('/empty')

  return (
    <div className="flex justify-center items-center mb-72 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={"Carrito"} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* carrito */}

          <div className="flex flex-col mt-5 gap-3">
            <span>Agregar mas Items</span>
            <Link href={"/"} className="underline mb-5">
              Continua Comprando
            </Link>

            {/* Items */}
            <ProductInCart />
          </div>
          {/* Sumary | CheckOut */}
          <OrderSumary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
