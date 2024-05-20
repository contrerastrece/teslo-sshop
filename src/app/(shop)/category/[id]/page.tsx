import { ProductGrid, Title } from "@/components";
import { ValidCategory, initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: ValidCategory;
  };
}
const products = initialData.products;
const CategoryPage = ({ params}: Props) => {
  const { id } = params;

  // if (id === "kids") {
  //   notFound();
  // }
  const categoryFilter=products.filter(item=>item.gender===id);


  const labels:Record<ValidCategory,string>={
    'men':'para Hombres',
    'women':'para Mujeres',
    'kid':'para Niños',
    'unisex':'para todos',
  }
  return (
    <div>
      <Title title={`Articulos ${labels[id]}`} subtitle="Todos los productos" />
      <ProductGrid products={categoryFilter} />
    </div>
  );
};

export default CategoryPage;
