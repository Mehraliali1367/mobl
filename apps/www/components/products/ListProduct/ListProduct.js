"use client";

import { useEffect, useState } from "react";
import Cart from "../Card";
import SideBar from "./SideBar";
import { getFetch } from "../../../utils/fetch";

export default function ListProduct({ data }) {
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState("");

  const checkStatusData = (message) => {
    if (message) {
      if (!message.next) {
        setNextPage("");
      } else {
        setNextPage(message.next);
      }
      if (message.results) {
        setProducts((prevProducts) => [...prevProducts, ...message.results]);
      }
    }
  };

  const loadMoreProduct = async () => {
    data = await getFetch(`${nextPage}`);
    checkStatusData(data.response);
  };

  useEffect(() => {
    setProducts([]);
    checkStatusData(data);
  }, [data]);

  return (
    <>
      <SideBar />
      <article className="container-products">
        <div className="products-wrapper" id="products-wrapper">
          {products ? (
            products.length !== 0 ? (
              <>
                {products.map((product, index) => (
                  <Cart key={index} product={product} />
                ))}
              </>
            ) : (
              <>
                <div className="message-info">موردی یافت نشد</div>
                {/* <Loading /> */}
              </>
            )
          ) : (
            <>
              <div className="message-error">
                خطای در دریافت اطلاعات رخ داده است
              </div>
            </>
          )}
        </div>
        <div className="text-center mt-5">
          {nextPage ? (
            <div className="section-center-box">
              <button
                className="btn btn-other-product"
                onClick={loadMoreProduct}
              >
                مشاهده ادامه محصولات این گروه
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </article>
    </>
  );
}
