"use client";
import { Pagination, Navigation, EffectFlip } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../public/css/slider-scroll-horizontal.css";
import Cart from "../Card";
import Link from "next/link";


export default function ContainerSlider({ products,category }) {
  // products ? console.log(products) : "";
  return (
    <article className="sofa">
      <Swiper id="swiper-id"
        modules={[Pagination, Navigation,EffectFlip]}
        spaceBetween={20}
        effect="fade"
        navigation={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={false}
        breakpoints={{
          0: { slidesPerView: 1 },
          580: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
        }}
        style={{
          "--swiper-navigation-color": "#4b2f02",
          "--swiper-pagination-color": "#4b2f02",
          "--swiper-pagination-bottom": "0px",
        }}
      >
        {products
          ? products.map((product) => (
              <SwiperSlide key={product.id}>
                <Cart product={product} />
              </SwiperSlide>
            ))
          : ""}
      </Swiper>
      <div className="section-center-box">
        <Link href={`/products?subcategories=${category}`} className="btn btn-other-product" onClick={() => {}}>
          {" "}
          مشاهده همه محصولات این گروه
        </Link>
      </div>
    </article>
  );
}
