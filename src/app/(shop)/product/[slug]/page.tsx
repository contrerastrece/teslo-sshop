export const revalidate = 64080;
import { getProductBySlug } from "@/actions";
import {
  ProductMobileSlideShow,
  ProductSlideShow,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import { AddToCart } from "./ui/AddToCart";
interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title,
    description: product?.description ?? "",
    openGraph: {
      title: product?.title,
      description: product?.description ?? "",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

const ProductPage = async ({ params }: Props) => {
  const { slug } = params;

  const product = await getProductBySlug(slug);
  // console.log(product);
  // const product = initialData.products.find((product) => product.slug === slug);
  if (!product) {
    notFound();
  }
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* slideShop */}
      <div className="col-span-1 md:col-span-2 ">
        {/* Desktop slideShow */}
        <ProductSlideShow
          images={product.images}
          title={product.title}
          className="md:block hidden"
        />
        {/* mobile slideShow */}
        <ProductMobileSlideShow
          images={product.images}
          title={product.title}
          className="block overflow-hidden md:hidden"
        />
      </div>
      {/* detailProduct */}
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">$ {product.price}</p>

        <AddToCart product={product} />
        
        {/* Description */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductPage;
