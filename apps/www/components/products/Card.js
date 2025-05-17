"use client";
import { addToCart, removFromCart } from "../../redux/slices/cartSlice";
import { getBlurDataUrl, numberFormat } from "../../utils/helper";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Cart({ product }) {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(removFromCart(product.id));
    dispatch(addToCart({ product, qty: 1 }));
    toast.success("محصول به سبد خرید اضافه شد .");
  };
  return (
    <div className="card-item swiper-slide">
      <div className="cart-container-img">
        <Link href={`/products/${product.slug}`}>
          <Image
            className="cart-img"
            width={0}
            height={0}
            sizes="100vw"
            style={{ objectFit: "contain", width: "100%", height: "auto" }}
            src={product ? product.primary_image : ""}
            placeholder="blur"
            blurDataURL={getBlurDataUrl()}
            alt="image-slider"
          />
        </Link>
        {product.is_sale ? (
          <>
            <div className="container-discount">
              <span className="card-discount">
                {product.discount_percent}
                <span className="card-discount-off">off</span>
                <span>%</span>
              </span>
              {/* <span className="shap-discount"></span> */}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="product-profile">
        <div className="card-container-title">
          <Link className="link-title" href={`/products/${product.slug}`}>
            {product.name}
          </Link>
        </div>
        <div className="card-sale">
          {product.is_sale ? (
            <>
              <span className="amount">
                {numberFormat(product.discount)}
                <i>تومان </i>
              </span>

              <del>
                <span className="amount">
                  {numberFormat(product.price)}
                  <i>تومان </i>
                </span>
              </del>
            </>
          ) : (
            <>
              <span className="amount">
                {numberFormat(product.price)}
                <i>تومان </i>
              </span>
            </>
          )}
        </div>
        {/* <div className="container-sofa-color">
            <span className="sofa-title-color">رنگبندی :</span>
            <span className="sofa-color"></span>
            <span className="sofa-color"></span>
          </div>
          <div className="container-sofa-count">
            <span className="sofa-count-title">تعداد :</span>
            <span className="count-up"></span>
            <span className="sofa-count">1</span>
            <span className="count-down"></span>
          </div> */}
        <div className="add-to-cart" onClick={() => handleAddToCart(product)}>
          <span>افزودن به سبد خرید</span>
        </div>
        <div className="card-info"></div>
      </div>
    </div>
  );
}
