"use client";
import React, { useState } from "react";
import Image from "next/image";

import { Swiper as SwiperObject } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./slideshow.css";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideShow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={className}>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{delay:2500}}
        thumbs={{ swiper: thumbsSwiper&&!thumbsSwiper.destroyed?thumbsSwiper:null }}
        modules={[FreeMode, Navigation, Thumbs,Autoplay]}
        className="mySwiper2"
      >
        {images.map((img) => (
          <SwiperSlide key={img}>
            <Image
              src={`/products/${img}`}
              width={1024}
              height={800}
              alt={title}
              className="rounded-md object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* thumb */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((img) => (
          <SwiperSlide key={img}>
            <Image
              src={`/products/${img}`}
              width={300}
              height={300}
              alt={title}
              className="rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
