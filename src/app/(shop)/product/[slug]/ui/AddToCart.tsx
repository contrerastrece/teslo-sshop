"use client";

import React, { useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product, ValidSize } from "@/interfaces";
import { useCartStore } from "@/store";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<ValidSize | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);
  const addProdcutToCart = useCartStore((state) => state.addProductToCart);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;
    // console.log({ size, quantity });
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      size: size,
    };
    addProdcutToCart(cartProduct);
    // formatear
    setPosted(false);
    setQuantity(1);
    setSize(undefined)
  };
  return (
    <div>
      {posted && !size && (
        <p className="text-red-500 border  mb-0 fade-in">
          Seleccione una Talla
        </p>
      )}
      {/* Selector de Tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />
      {/* Selector de Cantidad */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
      {/* Button */}
      <button className="btn-primary my-5" onClick={addToCart}>
        Agregar al carrito
      </button>
    </div>
  );
};
