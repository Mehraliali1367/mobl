"use server";

import { postFetch } from "@/utils/fetch";
import { messageFormat, phoneFormat } from "@/utils/helper";
import { cookies } from "next/headers";

async function loginAction(stateLogin, formData) {
  const phone = formData.get("phone");

  if (phone === "" || !phoneFormat(phone)) {
    return {
      status: "error",
      message: "شماره موبایل نادرست است.",
    };
  }
  const body = JSON.stringify({
    phone: phone,
  });
  const data = await postFetch("/accounts/login/", body);
  return data;
}

async function verifyAction(stateVerify, formData) {
  const otp = formData.get("otp");
  const pattern = /^[0-9]{4}$/;
  const token = await getToken("login-token");
  // console.log(token.value);

  if (otp === "" || !pattern.test(otp) || token?.erorr) {
    return {
      status: "error",
      message: " کد دریافتی را به درستی وارد کنید.",
    };
  }
  const body = JSON.stringify({
    otp: parseInt(otp),
    token: token.value,
  });
  const data = await postFetch("/accounts/verify-otp/", body);
  if (data.status_code === 200) {
    // console.log(data);
    removeTokens();
    storeToken("refresh-token", data.response.refresh);
    storeToken("access-token", data.response.access);
  }
  // console.log(data);
  return data;
}

async function resendOtp(stateResendOtp, formData) {
  const token = await getToken("login-token");

  if (token?.erorr) {
    return {
      status: "error",
      message: "توکن ورودی شما معتبر نیست. یکبار دیگر تلاش کنید",
    };
  }
  const body = JSON.stringify({
    token: token.value,
  });
  const data = await postFetch("/accounts/resend-otp/", body);
  // console.log(data.response.token);

  if (data.status_code === 200) {
    storeToken("login-token", data.response.token);
    return {
      status: data.status_code,
      message: "کد ورود دوباره برای شما ارسال شد",
    };
  } else {
    return {
      status: data.status_code,
      message: messageFormat(data.message),
    };
  }
}

const me_user = async () => {
  const access_token = await getToken("access-token");
  // console.log(access_token)
  if (access_token?.error) {
    return { error: "Not Authorizd" };
  }
  const data = await postFetch(
    "/accounts/user-me/",
    {},
    { Authorization: `Bearer ${access_token.value}` }
  );
  if (data.status_code === 200) {
    return { user: data };
  } else {
    return { error: "User Forbidden" };
  }
};
/**
 * Stores a token in cookies.
 * @param {string} token - The token to be stored.
 * @param {"access-token" | "refresh-token" |"login-token"} type  - The type of the token (access or refresh or login).
 */
const storeToken = async (type, token) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: type,
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
};

/**
 * Retrieves a token from cookies.
 * @param {"access-token" | "refresh-token" |"login-token"} type - The type of the token to retrieve (access or refresh).
 * @returns {string | undefined} The token, if found.
 */
const getToken = async (type) => {
  const cookieStore = await cookies();
  try {
    return { value: cookieStore.get(type).value };
  } catch (err) {
    return { error: "erro in getToken" };
  }
};

/**
 * Removes both access and refresh tokens from cookies.
 */
const removeTokens = async () => {
  try {
    const cookieStore = await cookies();

    cookieStore.delete("login-token");
    cookieStore.delete("access-token");
    cookieStore.delete("refresh-token");
  } catch (err) {
    console.log(err);
  }
};

const logout = async () => {
  const refreshToken = getToken("refresh-token");
  const data = await postFetch("/accounts/logout/", { refresh: refreshToken });
  removeTokens();
  return data;
};

const handleJWTRefresh = async () => {
  const refreshToken = getToken("refresh-token");
  const data = await postFetch({ refresh: refreshToken }, "/accounts/refresh/");
  storeToken("access-token", data.response.access);
  return data;
};

export {
  loginAction,
  verifyAction,
  resendOtp,
  removeTokens,
  getToken,
  storeToken,
  logout,
  handleJWTRefresh,
  me_user,
};
