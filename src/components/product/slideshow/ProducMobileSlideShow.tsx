"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./slideshow.css";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideShow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{ width: "100vw", height: "500px" }}
        pagination
        autoplay={{ delay: 2500 }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((img) => (
          <SwiperSlide key={img}>
            <Image
              src={`/products/${img}`}
              width={600}
              height={500}
              alt={title}
              className="object-cover min-w-[320px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
