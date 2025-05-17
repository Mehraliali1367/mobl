"use client";
import { GetPhoneClientAction } from "../../actions/homeActions/Home";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function GetPhoneClientForm() {
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
      <input
        name="phone"
        className="group-side-input"
        placeholder="شماره تماس شما 09xxxxxxxxx"
      />
      <button type="submit" className="group-side-btn" disabled={is_pending}>
        ارسال
        {is_pending && <div className="btn loading"></div>}
      </button>
    </form>
  );
}
