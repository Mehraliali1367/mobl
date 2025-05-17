"use client";
import { loginAction, storeToken } from "../actions/auth/loginAction";
import "../public/css/loginPage.css";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
export default function Login({ showSetState }) {
  const [stateLogin, formActionLogin, is_pending] = useActionState(
    loginAction,
    {}
  );
  useEffect(() => {
    if (stateLogin?.status === "error") {
      toast.error(stateLogin.message, {
        className: "Custom__Toastify",
        // autoClose: false,
      });
    }
    if (stateLogin?.status_code === 200) {
      toast.success("کد تایید برای شما ارسال شد.");
      //ba set shodan 101 dar page.js component Verify nemayesh dade mishavad 
      showSetState (101);
      storeToken("login-token", stateLogin.response.token);
      // console.log(stateLogin);
    }
    if (stateLogin?.status_code === 400) {
      toast.warning("شماره شما معتبر نیست.");
      // console.log(messageFormat(state.response));
    }
  }, [stateLogin]);
  return (
    <section className="login-page">
      <article className="pl-card-login">
        <div className="pl-form-container">
          <form action={formActionLogin}>
            <div className="pl-group-input">
              <label>شماره موبایل</label>
              <input name="phone" className="pl-form-control" />
            </div>
            <button
              className={is_pending ? "" : "btn pl-btn-login-page"}
              disabled={is_pending}
            >
              {" "}
              {is_pending ? <div className="loading"></div> : "ورود"}{" "}
            </button>
          </form>
        </div>
      </article>
    </section>
  );
}
