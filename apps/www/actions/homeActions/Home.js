"use server";

import { postFetch } from "@/utils/fetch";
import { phoneFormat } from "@/utils/helper";

async function GetPhoneClientAction(state, formData) {
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
  const data = await postFetch("/contactus/phoneclient/", body);
  return data;
}

export { GetPhoneClientAction };
