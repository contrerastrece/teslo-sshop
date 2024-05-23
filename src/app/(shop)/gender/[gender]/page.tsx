export const revalidate = 60; //60 seconds
import { Pagination, ProductGrid, Title } from "@/components";
import { notFound, redirect } from "next/navigation";
import { Gender } from "@prisma/client";
import React from "react";
import { getPaginatedProductsWithImages } from "@/actions";

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}
const CategoryPage = async ({ params, searchParams }: Props) => {
  const { gender } = params;

  // if (id === "kids") {
  //   notFound();
  // }
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page, gender: gender as Gender });
  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const categoryFilter = products.filter((item) => item.gender === gender);

  const labels: Record<string, string> = {
    men: "para Hombres",
    women: "para Mujeres",
    kid: "para Niños",
    unisex: "para todos",
  };
  return (
    <div>
      <Title
        title={`Articulos ${labels[gender]}`}
        subtitle="Todos los productos"
      />
      <ProductGrid products={categoryFilter} />

      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default CategoryPage;
