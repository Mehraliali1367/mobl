"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { resendOtp } from "../actions/auth/loginAction";

export default function ReSendOtp() {
  const [stateResendOtp, formActionResendOtp] = useActionState(resendOtp, {});

  useEffect(() => {
    toast(stateResendOtp?.message, { type: `${stateResendOtp?.status}` });
    if (stateResendOtp?.status === "success") {
      setMinutes(0);
      setSeconds(15);
    }
  }, [stateResendOtp]);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <div className="resend-opt-btn">
      {seconds > 0 || minutes > 0 ? (
        <div className="mb-1 me-3">
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </div>
      ) : (
        <form action={formActionResendOtp}>
          <button className="btn btn-resend">ارسال دوباره</button>
        </form>
      )}
    </div>
  );
}
