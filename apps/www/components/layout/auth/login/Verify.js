"use client";
import {
  verifyAction,
} from "../actions/auth/loginAction";
import AuthContext from "../context/AuthContext";
import "../public/css/loginPage.css";
import { useActionState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import ReSendOtp from "./ReSendOtp";
import { useRouter } from "next/navigation";
export default function Verify() {
  const [stateVerify, formActionVerify, is_pending] = useActionState(
    verifyAction,
    {}
  );
  const router = useRouter();
  const { loginContext } = useContext(AuthContext);

  useEffect(() => {
    if (stateVerify?.status === "error") {
      toast.error(stateVerify.message, {
        className: "Custom__Toastify",
        // autoClose: false,
      });
    }
    if (stateVerify?.status_code === 200) {
      toast.success("با موفقیت وارد شدید");
      loginContext(stateVerify.response.user);
      router.push("/")
    }
    if (stateVerify?.status_code === 400) {
      toast.warning("کد وارد شده معتبر نیست.");
      // console.log(messageFormat(state.response));
    }
  }, [stateVerify]);
  return (
    <section className="login-page">
      <article className="pl-card-login">
        <div className="pl-form-container">
          <form action={formActionVerify}>
            <div className="pl-group-input">
              <label>کد تایید</label>
              <input name="otp" className="pl-form-control" />
            </div>
            <button
              className={is_pending ? "" : "btn pl-btn-login-page"}
              disabled={is_pending}
            >
              {" "}
              {is_pending ? <div className="loading"></div> : "ورود"}{" "}
            </button>
          </form>
          <ReSendOtp />
        </div>
      </article>
    </section>
  );
}
