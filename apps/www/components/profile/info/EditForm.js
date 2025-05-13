"use client";
import { EditPersonalAction } from "@/actions/profile/profileAction";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EditForm({ data }) {
  const [stateEditProfile, formActionEdit, is_pending] = useActionState(
    EditPersonalAction,
    {}
  );
  useEffect(() => {
    if (stateEditProfile?.status_code === "error") {
      toast.error(stateEditProfile.message, {
        className: "Custom__Toastify",
        // autoClose: false,
      });
    }
    if (stateEditProfile?.status_code === 200) {
      console.log(stateEditProfile.response.full_name);
      toast.success("ویرایش با موفقیت انجام شد.");
    }
    if (stateEditProfile?.status_code === 400) {
      toast.warning("اطلاعات وارد شده معتبر نیست.");
    }
  }, [stateEditProfile]);
  return (
    <form action={formActionEdit}>
      <div className="group-control-input">
        <label className="form-label">نام و نام خانوادگی</label>
        <input
          type="text"
          name="full_name"
          className="form-control"
          defaultValue={data.full_name}
          onChange={(e) => {
            data.full_name = e.target.value;
          }}
        />
      </div>
      <div className="group-control-input">
        <label className="form-label">ایمیل</label>
        <input
          type="text"
          name="email"
          className="form-control"
          defaultValue={data.email}
          onChange={(e) => {
            data.email = e.target.value;
          }}
        />
      </div>
      <div className="group-control-input">
        <label className="form-label">شماره تلفن</label>
        <input
          type="text"
          name="phone"
          disabled
          className="form-control disabled"
          defaultValue={data.phone_number}
        />
      </div>
      <button
        className={is_pending ? "loading profile-btn" : "btn profile-btn"}
        disabled={is_pending}
      >
        {!is_pending && " ویرایش"}
      </button>
    </form>
  );
}
