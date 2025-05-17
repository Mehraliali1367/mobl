"use client";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Cart from "../Card";
import "../../public/css/slider-scroll-horizontal.css";


export default function subPic({ pics }) {
  // products ? console.log(products) : "";
  return (
    <article className="sofa">
      <Swiper id="swiper-id"
        spaceBetween={20}
        navigation={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={false}
        modules={[Pagination, Navigation]}
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
        {pics
          ? products.map((product) => (
              <SwiperSlide key={product.id}>
                <Cart product={product} />
              </SwiperSlide>
            ))
          : ""}
      </Swiper>
      <div className="section-center-box">
        <button className="btn btn-other-product" onClick={() => {}}>
          {" "}
          مشاهده همه محصولات این گروه
        </button>
      </div>
    </article>
  );
}
