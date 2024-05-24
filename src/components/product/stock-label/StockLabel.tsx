"use client";
import { getStockBySlug } from "@/actions/products/stock-by-slug";
import { titleFont } from "@/config/fonts";
import React, { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getStock();
  }, []);
  const getStock = async () => {
    const data = await getStockBySlug(slug);
    // console.log(data);
    setStock(data);
    setIsLoading(false);
    return stock;
  };
  return (
    <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
      {isLoading ? "Loading" : <>Stock: {stock}</>}
    </h1>
  );
};
