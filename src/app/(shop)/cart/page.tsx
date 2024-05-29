import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { ProductInCart } from "./ui/ProductInCart";
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
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit ">
            <h2 className="text-2xl">Resumen de Orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 artículos </span>

              <span>Subtotal</span>
              <span className="text-right">$ 100 </span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$ 100 </span>

              <span className="text-2xl mt-5">Total</span>
              <span className="text-2xl mt-5 text-right">$ 100 </span>
            </div>

            <div className="mt-5 mb-2">
              <Link
                href={"/checkout/address"}
                className="flex btn-primary justify-center"
              >
                CheckOut
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
