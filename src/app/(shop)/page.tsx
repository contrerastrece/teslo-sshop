export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";
// import { initialData } from "@/seed/seed";

// const products = initialData.products;
interface Props {
  searchParams: {
    page?: string;
    gender?: string;
  };
}
export default async function HomePage({ searchParams }: Props) {
  // console.log({ searchParams }, "🚩");
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  });
  // console.log(totalPages, "🟢");
  if (products.length === 0) {
    redirect("/");
  }

  return (
    <div className="">
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
