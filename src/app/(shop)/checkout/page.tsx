import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

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
              {/* Disclaimer */}
              <p className="mb-5">
                <span className="text-xs">
                  Al hacer click en &rdquo;Colocar orden&rdquo;, aceptas nuestros{" "}
                  <a href="" className="underline">
                    términos y condiciones
                  </a>
                  y
                  <a href="" className="underline">
                    políticas de privacidad
                  </a>
                </span>
              </p>

              <Link
                href={"/orders/123"}
                className="flex btn-primary justify-center"
              >
                Colocar Orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
