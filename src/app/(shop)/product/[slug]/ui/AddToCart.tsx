"use client";

import React, { useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components";
import { Product, ValidSize } from "@/interfaces";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<ValidSize | undefined>();
  const [qunatity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;
    console.log({ size, qunatity });
  };
  return (
    <div>
      {posted && !size && (
        <p className="text-red-500 border  mb-0 fade-in">Seleccione una Talla</p>
      )}
      {/* Selector de Tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />
      {/* Selector de Cantidad */}
      <QuantitySelector quantity={qunatity} onQuantityChanged={setQuantity} />
      {/* Button */}
      <button className="btn-primary my-5" onClick={addToCart}>
        Agregar al carrito
      </button>
    </div>
  );
};
