"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { numberFormat } from "../../../utils/helper";

export default function Order({ data }) {
  const ModalOrders = dynamic(() => import("./modalOrders"), { ssr: false });
  const [stateDisplayModal, setSateDispalyModal] = useState(false);
  const [stateOrderItem, setOrderItem] = useState([]);
  const ClickShow = (orderId) => {
    const item = data.filter((item) => {
      return item.id == orderId
    });
    setOrderItem(item)
    setSateDispalyModal(true)
  };
  return (
    <>
      <div>
        <div className="table">
          <div className="table-head table-row">
            <div className="col-3vw">شماره سفارش</div>
            <div className="col-3vw">آدرس</div>
            <div className="col-12vw">وضعیت</div>
            <div className="col-5vw">وضعیت پرداخت</div>
            <div className="col-5vw">قیمت کل</div>
            <div className="col-10vw">تاریخ</div>
            <div className="col-3vw">نمایش فاکتور</div>
          </div>
          {data.map((order) => (
            <div key={order.id} className="table-row">
              <div className="col-3vw">{order.id}</div>
              <div className="col-3vw">{order.profile}</div>
              <div className="ccol-12vw"> {order.posting_order}</div>
              <div className="col-5vw">{order.paid ? "انجام شده" : "ناموفق"}</div>
              <div className="col-5vw">{numberFormat(order.get_total_price)}</div>
              <div className="col-10vw">{order.get_create_persian_date}</div>
              <div className="col-3vw">
                <button
                  className="btn btn-table"
                  onClick={() => ClickShow(order.id)}
                >
                  <i className="bi bi-card-checklist"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ModalOrders showModal={stateDisplayModal} data={stateOrderItem}/>
    </>
  );
}
