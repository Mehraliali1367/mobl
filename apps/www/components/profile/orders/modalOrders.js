"use client";

import { getBlurDataUrl, numberFormat } from "../../utils/helper";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ModalOrders({ showModal, data }) {
  data.map((item) => {
    console.log(item.Items);
  });

  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    showModal && setIsActive(true);
  }, [showModal]);
  const ClickClose = () => {
    setIsActive(false);
  };
  return (
    <>
      <div
        id="myModal"
        style={{ display: isActive ? "block" : "none" }}
        className="modal"
      >
        <div className="modal-content">
          <span
            className="close"
            style={{ display: isActive ? "block" : "none" }}
            onClick={ClickClose}
          >
            &times;
          </span>
          <div className="table">
            <div className="table-head table-row">
              <div className="col-5vw">محصول</div>
              <div className="col-5vw">نام</div>
              <div className="col-10vw">قیمت</div>
              <div className="col-5vw">تعداد</div>
              <div className="col-5vw">قیمت کل</div>
            </div>
            {data.map((order) =>
              order.Items.map((item) => (
                <div key={item.id} className="table-row">
                  <div className="col-5vw table-img">
                    {item.product.images.map(
                      (img, index) =>
                        img.product_type_name == 7 && (
                          <Image
                            key={index}
                            className="pic-large"
                            priority
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                            src={img.img100}
                            placeholder="blur"
                            blurDataURL={getBlurDataUrl()}
                            alt="image-slider"
                          />
                        )
                    )}
                  </div>
                  <div className="col-5vw">{item.product.name}</div>
                  <div className="col-10vw">{numberFormat(item.price)}</div>
                  <div className="col-5vw">{item.quantity}</div>
                  <div className="col-10vw">
                    {numberFormat(item.price * item.quantity)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
