"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAddressStore, useCartStore } from "@/store";
import { AddressForm } from "../../address/ui/AddressForm";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { sleep } from "@/utils/sleep";
import { placeOrder } from "@/actions";
import { useRouter } from "next/navigation";

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const addres = useAddressStore((state) => state.address);
  const { itemsInCart, subtotal, tax, total } = useCartStore((state) =>
    state.getOrderSumary()
  );
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    // console.log({ addres, productToOrder });
    const response = await placeOrder(productToOrder, addres);

    console.log(response);
    // TODO:server_actions
    // await sleep(2);

    if (!response.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(response.message);
      return;
    }

    // * si todo sale bien (limpiamos el cart)
    clearCart();

    // redireccionamos
    router.replace("/orders/" + response.order);
  };

  if (!loaded) {
    return <p>Loading...</p>;
  }
  return (
    <div className="bg-white rounded-xl shadow-xl p-7 ">
      <h2 className="text-2xl font-bold">Direccion de Entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {addres.firstName} {addres.lastName}
        </p>
        <p>
          {addres.address} - {addres.city} - {addres.country}
        </p>
        <p>{addres.address2}</p>
        <p>{addres.phone}</p>
      </div>
      {/* Divider */}
      <div className="w-full h-0.5  rounded bg-gray-200 mb-10"></div>
      <h2 className="text-2xl">Resumen de Orden</h2>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">{itemsInCart}</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subtotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="text-2xl mt-5">Total</span>
        <span className="text-2xl mt-5 text-right">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
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

        {/* <Link href={"/orders/123"} className="flex btn-primary justify-center"> */}
        <span className="text-red-500">{errorMessage}</span> 
        <button
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
          onClick={onPlaceOrder}
          disabled={isPlacingOrder}
        >
          Colocar Orden
        </button>
      </div>
    </div>
  );
};
