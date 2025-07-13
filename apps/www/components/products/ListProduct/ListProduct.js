"use client";

import Cart from "./Card";
import SideBar from "./SideBar";

export default function ListProduct({ products }) {
  //   const [products, setProducts] = useState([]);

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
        {/* <div className="text-center mt-5">
          {hasMoreData ? (
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
        </div> */}
      </article>
    </>
  );
}
