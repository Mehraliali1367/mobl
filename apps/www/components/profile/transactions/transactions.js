"use client";

import { numberFormat } from "../../../utils/helper";


export default function Transactions({ data }) {

  return (
    <>
      <div>
        <div className="table">
          <div className="table-head table-row">
            <div className="col-3vw">شماره سفارش</div>
            <div className="col-3vw">مبلغ</div>
            <div className="col-3vw">وضعیت</div>
            <div className="col-3vw">شماره پیگیری</div>
            <div className="col-3vw">تاریخ</div>
          </div>
          {data.map((tran, index) => (
            <div key={index} className="table-row">
              <div className="col-3vw">{tran.order}</div>
              <div className="col-3vw">{numberFormat(tran.amount)}</div>
              <div className="col-3vw"> {tran.status}</div>
              <div className="col-3vw">{tran.trans_id}</div>
              <div className="col-3vw">{tran.get_create_persian_date}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
