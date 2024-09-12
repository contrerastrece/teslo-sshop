"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Link from "next/link";
import { currencyFormat } from "@/utils";

export const ProductInCart = () => {
  const [loaded, setLoaded] = useState(false);

  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <>Loading...</>;
  }
  return (
    <div>
      {productsInCart.map((product) => (
        <div className="flex" key={`${product.slug}-${product.size}`}>
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            height={100}
            width={100}
            className="mr-5 rounded"
            style={{
              // objectFit:'contain'
              width: "100px",
              height: "100px",
            }}
          />
          <div className="">
            <span className="hover:underline">
              {product.title} - {product.size} ({product.quantity})
            </span>
            <p className="font-bold">
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
