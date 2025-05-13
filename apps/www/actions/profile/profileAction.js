"use server";

import { deleteFetch, postFetch, putFetch } from "@/utils/fetch";
import { getToken } from "../auth/loginAction";
import { emailFormat } from "@/utils/helper";

const EditPersonalAction = async (state, formdata) => {
  const full_name = formdata.get("full_name");
  const email = formdata.get("email");

  // console.log(full_name + "  " + email + " ");

  if (full_name === "") {
    return {
      status: "error",
      message: "نام را به درستی وارد کنید",
    };
  }
  if (email != "") {
    if (!emailFormat(email)) {
      return {
        status_code: "error",
        message: "ایمیل معتبر وارد کنید.",
      };
    }
  }
  const access_token = await getToken("access-token");
  // console.log(access_token)
  if (access_token?.error) {
    return { error: "Not Authorizd" };
  }
  const body = JSON.stringify({
    email: email,
    full_name: full_name,
  });
  const data = await putFetch("/accounts/user-me/", body, {
    Authorization: `Bearer ${access_token.value}`,
  });
  if (data.status_code === 200) {
    return { status_code: data.status_code, response: data.response };
  } else {
    return { error: "User Forbidden" };
  }
};

const NewAddressAction = async (state, formdata) => {
  const title = formdata.get("title");
  const postal_code = formdata.get("postal_code");
  const province = formdata.get("province");
  const city = formdata.get("city");
  const address = formdata.get("address");
  const tel = formdata.get("tel");

  // console.log(full_name + "  " + email + " ");

  if (title === "") {
    return {
      status: "error",
      message: "عنوان مناسبی انتخاب کنید",
    };
  }
  if (province === "") {
    return {
      status: "error",
      message: "استان محل سکونت خود را به دقت پر کنید",
    };
  }
  if (city === "") {
    return {
      status: "error",
      message: "شهر محل سکونت خود را به دقت پر کنید",
    };
  }
  if (address === "") {
    return {
      status: "error",
      message: "محل سکونت خود را به دقت پر کنید",
    };
  }
  if (tel === "") {
    return {
      status: "error",
      message: "تلفن را به درستی وارد کنید",
    };
  }
  if (postal_code === "") {
    return {
      status_code: "error",
      message: "کد پستی را به دقت پر کنید",
    };
  }
  const access_token = await getToken("access-token");
  // console.log(access_token)
  if (access_token?.error) {
    return { error: "Not Authorizd" };
  }
  const body = JSON.stringify({
    title: title,
    postal_code: postal_code,
    province: province,
    city: city,
    address: address,
    tel: tel,
  });
  const data = await postFetch("/accounts/profile/personal/", body, {
    Authorization: `Bearer ${access_token.value}`,
  });
  if (data.status_code === 200) {
    return { status_code: data.status_code, response: data.response };
  } else {
    return { error: "User Forbidden" };
  }
};
const EditAddresslAction = async (state, formdata) => {
  const address_id = formdata.get("address_id");
  const title = formdata.get("title");
  address_id;
  const postal_code = formdata.get("postal_code");
  const province = formdata.get("province");
  const city = formdata.get("city");
  const address = formdata.get("address");
  const tel = formdata.get("tel");

  // console.log(full_name + "  " + email + " ");

  if (address_id === "") {
    return {
      status: "error",
      message: "آدرس مورد نظر شناسایی نشد.درخواست شما نامعتبراست.",
    };
  }
  if (title === "") {
    return {
      status: "error",
      message: "عنوان مناسبی انتخاب کنید",
    };
  }
  if (province === "") {
    return {
      status: "error",
      message: "استان محل سکونت خود را به دقت پر کنید",
    };
  }
  if (city === "") {
    return {
      status: "error",
      message: "شهر محل سکونت خود را به دقت پر کنید",
    };
  }
  if (address === "") {
    return {
      status: "error",
      message: "محل سکونت خود را به دقت پر کنید",
    };
  }
  if (tel === "") {
    return {
      status: "error",
      message: "تلفن را به درستی وارد کنید",
    };
  }
  if (postal_code === "") {
    return {
      status_code: "error",
      message: "کد پستی را به دقت پر کنید",
    };
  }
  const access_token = await getToken("access-token");
  // console.log(access_token)
  if (access_token?.error) {
    return { error: "Not Authorizd" };
  }
  const body = JSON.stringify({
    id: address_id,
    title: title,
    postal_code: postal_code,
    province: province,
    city: city,
    address: address,
    tel: tel,
  });
  const data = await putFetch("/accounts/profile/personal/", body, {
    Authorization: `Bearer ${access_token.value}`,
  });
  if (data.status_code === 200) {
    return { status_code: data.status_code, response: data.response };
  } else {
    return { status_code: data.status_code, response: data.response };
  }
};

const RemoveAddressAction = async (state, formdata) => {
  const address_id = formdata.get("address_id");
  if (address_id === "") {
    return {
      status: "error",
      message: "آدرس مورد نظر شناسایی نشد.درخواست شما نامعتبراست.",
    };
  }
  const access_token = await getToken("access-token");
  // console.log(access_token)
  if (access_token?.error) {
    return { error: "Not Authorizd" };
  }
  const body = JSON.stringify({ id: address_id });
  const data = await deleteFetch("/accounts/profile/personal/", body, {
    Authorization: `Bearer ${access_token.value}`,
  });
  if (data.status_code === 200) {
    return { status_code: data.status_code, response: data.response };
  } else {
    return { status_code: data.status_code, response: data.response };
  }
};
export {
  EditPersonalAction,
  NewAddressAction,
  EditAddresslAction,
  RemoveAddressAction,
};
