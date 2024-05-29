"use client";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const OrderSumary = () => {
  const [loaded, setLoaded] = useState(false);

  const orderSumary = useCartStore((state) => state.getOrderSumary());

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <>Loading...</>;

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit ">
      <h2 className="text-2xl">Resumen de Orden</h2>
      <div className="grid grid-cols-2">
        <span>N°. Productos</span>
        <span className="text-right">{orderSumary.itemsInCart} artículos </span>

        <span>Subtotal</span>
        <span className="text-right">
          {currencyFormat(orderSumary.subtotal)}{" "}
        </span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(orderSumary.tax)} </span>

        <span className="text-2xl mt-5">Total</span>
        <span className="text-2xl mt-5 text-right">
          {currencyFormat(orderSumary.total)}{" "}
        </span>
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
  );
};
