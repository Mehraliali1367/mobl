"use client";

import { numberFormat } from "@/utils/helper";

export default function Transactions({ data }) {
  return (
    <>
      <div>
        <div className="table">
          <div className="table-head table-row">
            <div className="col-1">شماره سفارش</div>
            <div className="col-2">مبلغ</div>
            <div className="col-3">وضعیت</div>
            <div className="col-4">شماره پیگیری</div>
            <div className="col-5">تاریخ</div>
          </div>
          {data.map((tran, index) => (
            <div key={index} className="table-row">
              <div className="col-1">{tran.order}</div>
              <div className="col-2">{numberFormat(tran.amount)}</div>
              <div className="col-3"> {tran.status}</div>
              <div className="col-4">{tran.trans_id}</div>
              <div className="col-5">{tran.get_create_persian_date}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
