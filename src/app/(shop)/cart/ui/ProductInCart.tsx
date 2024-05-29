"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Link from "next/link";

export const ProductInCart = () => {
  const [loaded, setLoaded] = useState(false);

  const productsInCart = useCartStore((state) => state.cart);
  const [quantity, setQuantity] = useState();

  const updateProductInCart = useCartStore(
    (state) => state.updateProductToCart
  );

  // console.log(productsInCart)

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
            <Link href={`/product/${product.slug}`} className="hover:underline">
              {product.title} - {product.size}
            </Link>
            <p className="">$ {product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) => {
                updateProductInCart(product, quantity);
              }}
            />

            <button className="underline mt-3">Remover</button>
          </div>
        </div>
      ))}
    </div>
  );
};
