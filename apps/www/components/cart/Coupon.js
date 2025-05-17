"use client";
import { GetPhoneClientAction } from "../actions/homeActions/Home";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Coupon({ addresses }) {
  const [state, formAction, is_pending] = useActionState(
    GetPhoneClientAction,
    {}
  );
  useEffect(() => {
    if (state?.status === "error") {
      toast.error(state.message, {
        className: "Custom__Toastify",
        // autoClose: false,
      });
    }
    if (state?.status_code === 201) {
      toast.success("شماره شما ذخیره شد.");
    }
    if (state?.status_code === 400) {
      toast.warning("شماره شما قبلا ذخیره شده است");
      // console.log(messageFormat(state.response));
    }
  }, [state]);
  return (
    <form action={formAction} className="contact-form">
      <div className="">
      <div className="group-side">
      <input name="phone" className="group-side-input" placeholder="کدتخفیف" />
      <button type="submit" className="group-side-btn" disabled={is_pending}>
        اعمال تخفیف
        {is_pending && <div className="btn loading"></div>}
      </button>
      </div>
      <div className="group-control-input mt-3 ms-1">
        <label className="form-label">انتخاب آدرس :</label>
        <select name="address" className="form-control">
          <option>------</option>
          {addresses.map((address) => (
            <option key={address.id} value={address.id}>
              {address.title}
            </option>
          ))}
        </select>
      </div>
      </div>
    </form>
  );
}
