"use client";

import Image from "next/image";
import { getBlurDataUrl, numberFormat } from "../../utils/helper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "../../public/css/productPage.css";

// import large from "../../public/images/products/chob iran1/chob-iran1-size-800pixle.jpg";

import { useEffect, useState } from "react";
import Link from "next/link";
import TabsProfileProduct from "./tabsProfileProduct/TabsProfileProduct";
import { useDispatch } from "react-redux";
import { addToCart, removFromCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

export default function Product({ product }) {
  // console.log(product);
  const [picMaster, setPicMaster] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  product = product.response;
  const handleClick = (e) => {
    setPicMaster(e);
  };
  const handleAddToCart = (product) => {
    dispatch(removFromCart(product.id));
    dispatch(addToCart({ product, qty: quantity }));
    toast.success("محصول به سبد خرید اضافه شد.");
  };
  const tabData = [
    { label: "توضیحات" },
    { label: "نظرات" },
    { label: "سوالات متداول" },
  ];
  const data = [{ tab1: product.description_full }];
  useEffect(() => {
    setPicMaster(product.primary_image);
  }, []);

  return (
    <section className="section-product">
      <article className="pics">
        <div className="container-product">
          <div className="container-pic">
            <div className="pic-large-size">
              <Image
                className="pic-large"
                priority
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                src={picMaster?.length > 2 ? picMaster : product.primary_image}
                placeholder="blur"
                blurDataURL={getBlurDataUrl()}
                alt="image-slider"
              />
            </div>
            <div className="container-swiper swiper-wrapper-page-product">
              <Swiper
                // onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="swiper"
                style={{width:"20vw"}}
              >
                {product.images
                  ? product.images.map((img, index) => (
                      <SwiperSlide key={index}>
                        <Image
                          className="product-page-img-slid"
                          priority
                          width={0}
                          height={0}
                          sizes="70"
                          style={{ width: "100%", height: "auto" }}
                          src={img.img_l}
                          placeholder="blur"
                          blurDataURL={getBlurDataUrl()}
                          alt="image-slider"
                          onClick={() => handleClick(img.img_h)}
                        />
                      </SwiperSlide>
                    ))
                  : ""}
              </Swiper>
            </div>
          </div>
          <div className="container-profile">
            <h2>{product.name}</h2>
            <span>
              دسته بندی :
              <Link
                className="link-category"
                href={`/products/?subcategory=${product.category}`}
              >
                {product.category_name_persian}
              </Link>
            </span>
            <p className="page-product-amount">
              {product.is_sale ? (
                <>
                  <del className=" amount-del">
                    {numberFormat(product.price)}
                  </del>
                  <span>تومان</span>
                  <ins className=" amount-ins">
                    {numberFormat(product.discount)}
                  </ins>
                  <span>تومان</span>
                </>
              ) : (
                <>
                  <ins className=" amount-ins">
                    {numberFormat(product.price)}
                  </ins>
                  <span>تومان</span>
                </>
              )}
            </p>
            <p className="discount-product">
              {product.is_sale && "٪" + product.discount_percent + " تخفیف"}{" "}
            </p>
            <form>
              <div className="container-sale">
                <div className="container-count">
                  <span className="title">تعداد :</span>
                  <span
                    className="count-up"
                    onClick={() =>
                      product.quantity > quantity && setQuantity(quantity + 1)
                    }
                  ></span>
                  <span className="count">{quantity}</span>
                  <span
                    className={
                      quantity > 1 ? "count-down" : "count-down disable"
                    }
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  ></span>
                </div>
                <span
                  className="btn btn-add-to-card"
                  onClick={() => handleAddToCart(product)}
                >
                  افزودن به سبد خرید
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className="profile-tab">
          <TabsProfileProduct tabs={tabData} data={data} />
        </div>
      </article>
    </section>
  );
}

// <Image
// className="product-page-img-slid"
// width={0}
// height={0}
// sizes="100vw"
// style={{ width: "80%", height: "30%" }}
// src={(product.images[1]).img100}
// placeholder="blur"
// blurDataURL={getBlurDataUrl()}
// alt="image-slider"
// onClick={() => handleClick(product.images[1].img800)}
// />
// <Image
// className="product-page-img-slid"
// width={0}
// height={0}
// sizes="100vw"
// style={{ width: "80%", height: "30%" }}
// src={(product.images[0]).img100}
// placeholder="blur"
// blurDataURL={getBlurDataUrl()}
// alt="image-slider"
// onClick={() => handleClick(product.images[0].img800)}
// />
// <Image
// className="product-page-img-slid"
// width={500}
// height={50}
// sizes="100vw"
// style={{ width: "100%", height: "50%" }}
// src={(product.images[2]).img100}
// placeholder="blur"
// blurDataURL={getBlurDataUrl()}
// alt="image-slider"
// onClick={() => handleClick(product.images[2].img800)}
// />
// <Image
// className="product-page-img-slid"
// width={0}
// height={0}
// sizes="100vw"
// style={{ width: "80%", height: "30%" }}
// src={(product.images[3]).img100}
// placeholder="blur"
// blurDataURL={getBlurDataUrl()}
// alt="image-slider"
// onClick={() => handleClick(product.images[3].img800)}
// />
