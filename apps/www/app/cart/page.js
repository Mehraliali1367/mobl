"use client";

// import Coupon from "@/components/cart/Coupon";
import { getBlurDataUrl, numberFormat } from "@/utils/helper";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import "@/public/css/page_cart.css";
import { useEffect, useState } from "react";
import { getToken } from "@/actions/auth/loginAction";
import { getFetch } from "@/utils/fetch";
import { removFromCart } from "@/redux/slices/cartSlice";
export default function Cart() {
  const state = useSelector((state) => state.shoppingCart);
  const [stateAddress, setAddress] = useState([]);
  const [stateSumTotal, setSumTotal] = useState(0);
  // const [stateSumDiscount, setSumDiscount] = useState(0);
  const [statePayment, setPayment] = useState(0);
  const getAddress = async () => {
    const access_token = await getToken("access-token");
    const profile = await getFetch("/accounts/profile/personal/", {
      Authorization: `Bearer ${access_token.value}`,
    });
    setAddress(profile.response.addresses);
  };
  const dispatch = useDispatch();
  const handleRemoveFromCart = (product) => {
    dispatch(removFromCart(product.id));
  };
  const sumTotal = () => {
    let sumTotal = 0;
    // let sumDiscount = 0;
    let sumPayment = 0;
    state.cart.map((product) => {
      sumTotal = sumTotal + product.price * product.qty;
      sumPayment = sumPayment + product.totalPriceProduct;
    });
    setSumTotal(sumTotal);
    setPayment(sumPayment);
  };
  useEffect(() => {
    getAddress();
    sumTotal();
    // console.log(state.cart);
  }, []);
  useEffect(()=>{
    sumTotal();
  },[state])
  return (
    <div className="cart">
      <div className="table">
        <div className="table-head table-row">
          <div className="col-5vw">ردیف</div>
          <div className="col-10vw ">محصول</div>
          <div className="col-10vw ">نام</div>
          <div className="col-10vw">قیمت</div>
          <div className="col-5vw">تعداد</div>
          <div className="col-5vw">تخفیف</div>
          <div className="col-14vw">قیمت کل</div>
          <div className="col-5vw">حذف</div>
        </div>
        {state.cart.map((product, index) => (
          <div key={index} className="table-row">
            <div className="col-5vw">{index + 1}</div>
            <div className="col-10vw ">
              <Image
                className="pic"
                priority
                width={0}
                height={0}
                sizes="100vw"
                src={product.primary_image}
                placeholder="blur"
                blurDataURL={getBlurDataUrl()}
                alt="image-slider"
              />
            </div>
            <div className="col-10vw ">{product.name}</div>
            <div className="col-10vw ">{numberFormat(product.price)}</div>
            <div className="col-5vw ">{product.qty}</div>
            <div className="col-5vw ">{product.discount_percent}%</div>
            <div className="col-14vw">
              {numberFormat(product.totalPriceProduct)}
            </div>
            <div className="col-5vw">
              <button
                className="btn btn-table"
                onClick={() => handleRemoveFromCart(product)}
              >
                X
              </button>
            </div>
          </div>
        ))}
        {/* <div className="table-row border">مجموع سبد خرید</div> */}
        <div className="table-row ">
          <div className="col-10vw border">
            <span>مجموع مبلغ فاکتور</span>
            <div>{numberFormat(stateSumTotal)}</div>
          </div>
          <div className="col-10vw border">
            <span>کل مبلغ تخفیف</span>
            <div>{numberFormat(stateSumTotal - statePayment)}</div>
          </div>
          <div className="col-10vw border clr-success">
            <span>جمع کل پرداختی</span>
            <div>{numberFormat(statePayment)}</div>
          </div>
        </div>
      </div>

      <div className="">
        <button className="btn btn-table ms-2">پرداخت</button>
      </div>

      {/* <Coupon addresses={stateAddress} /> */}
    </div>
  );
}
