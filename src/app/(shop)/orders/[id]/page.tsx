import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoCardOutline, IoCartOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

const CartPage = ({ params }: Props) => {
  const { id } = params;

  return (
    <div className="flex justify-center items-center mb-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden # ${id}`} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* carrito */}

          <div className="flex flex-col mt-5 gap-3">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": false,
                  "bg-green-500": true,
                }
              )}
            >
              <IoCardOutline size={25} />
              {/* <span className="mx-2">Pendiente de Pago</span> */}
              <span className="mx-2">Pagada</span>
            </div>
            {/* Items */}

            {productsInCart.map((product) => (
              <div className="flex" key={product.slug}>
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  height={100}
                  width={100}
                  className="mr-5 rounded"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                <div className="">
                  <p className="">{product.title}</p>
                  <p className="">$ {product.price} x 3</p>
                  <p className="font-bold">Subtotal :$ {product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Sumary | CheckOut */}
          <div className="bg-white rounded-xl shadow-xl p-7 ">
            <h2 className="text-2xl font-bold">Direccion de Entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Nombre del Usuari</p>
              <p>Direccion del Usuario</p>
              <p>CP 13150</p>
              <p>123-132-321</p>
            </div>
            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-50 mb-10"></div>
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
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": false,
                    "bg-green-500": true,
                  }
                )}
              >
                <IoCardOutline size={25} />
                {/* <span className="mx-2">Pendiente de Pago</span> */}
                <span className="mx-2">Pagada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
