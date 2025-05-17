"use client";
import {
  EditAddresslAction,
  RemoveAddressAction,
} from "../../actions/profile/profileAction";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EditAddress({ provinces, cities, address }) {
  const [stateCities, setStateCities] = useState(cities);
  const [stateEditAddress, formActionEditAddress, is_pending] = useActionState(
    EditAddresslAction,
    {}
  );
  const [stateRemoveAddress, formActionRemoveAddress, is_pending_remove] =
    useActionState(RemoveAddressAction, {});
useEffect(()=>{
  if (stateRemoveAddress?.status_code === 400) {
    toast.error(stateEditAddress.message, {
      className: "Custom__Toastify",
      // autoClose: false,
    });
  }
  if (stateRemoveAddress?.status_code === 200) {
    toast.success("آدرس با موفقیت حذف شد.");
  }
},[stateRemoveAddress])
  useEffect(() => {
    if (stateEditAddress?.status_code === "error") {
      toast.error(stateEditAddress.message, {
        className: "Custom__Toastify",
        // autoClose: false,
      });
    }
    if (stateEditAddress?.status_code === 200) {
      toast.success("آدرس جدید با موفقیت ذخیره شد.");
    }
    if (stateEditAddress?.status_code === 400) {
      const er = Object.keys(stateEditAddress.response)[0];
      let txt_er = null;
      if (er == "postal_code") txt_er = "کد پستی";
      if (er == "title") txt_er = "عنوان";
      if (er == "province") txt_er = "استان";
      if (er == "city") txt_er = "شهر";
      if (er == "address") txt_er = "آدرس";
      if (er == "tel") txt_er = "شماره تماس";
      toast.warning(`اطلاعات وارد شده ${txt_er} معتبر نیست.`);
    }
  }, [stateEditAddress]);

  const changeProvince = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    setStateCities(cities.filter((city) => city.provinceId == option));
    address.province = e.target.value;
  };
  return (
    <div className="container-form">
      <form action={formActionEditAddress} className="border-form">
        <input name="address_id" type="hidden" value={address.id} />
        <div className="group-box-input">
          <div className="group-control-input">
            <label className="form-label">عنوان</label>
            <input
              type="text"
              name="title"
              className="form-control"
              defaultValue={address.title}
              onChange={(e) => {
                address.title = e.target.value;
              }}
            />
          </div>
          <div className="group-control-input">
            <label className="form-label">شماره تماس</label>
            <input
              type="text"
              name="tel"
              className="form-control"
              defaultValue={address.tel}
              onChange={(e) => {
                address.tel = e.target.value;
              }}
            />
          </div>
        </div>
        <div className="group-box-input">
          <div className="group-control-input">
            <label className="form-label">استان</label>
            <select
              name="province"
              className="form-control"
              onChange={changeProvince}
              defaultValue={address.province}
            >
              <option>------</option>
              {provinces.map((province) => (
                <option
                  key={province.id}
                  id={province.provinceId}
                  value={province.id}
                >
                  {province.provinceName}
                </option>
              ))}
            </select>
          </div>
          <div className="group-control-input">
            <label className="form-label">شهر</label>
            <select
              name="city"
              className="form-control"
              defaultValue={address.city}
              onChange={(e) => {
                address.city = e.target.value;
              }}
            >
              <option>------</option>
              {stateCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.cityName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="group-box-input">
          <div className="group-control-input">
            <label className="form-label">کدپستی</label>
            <input
              type="text"
              name="postal_code"
              className="form-control "
              defaultValue={address.postal_code}
              onChange={(e) => {
                address.postal_code = e.target.value;
              }}
            />
          </div>
        </div>
        <div className="group-control-input">
          <label className="form-label">آدرس</label>
          <textarea
            rows={3}
            type="text"
            name="address"
            className="form-control "
            defaultValue={address.address}
            onChange={(e) => {
              address.address = e.target.value;
            }}
          />
        </div>

        <button
          className={is_pending ? "loading profile-btn" : "btn profile-btn"}
          disabled={is_pending}
        >
          {!is_pending && "ویرایش"}
        </button>
      </form>
      <form action={formActionRemoveAddress} className="form-remove">
        <input name="address_id" type="hidden" value={address.id} />
        <button className="btn profile-btn profile-remove">حذف</button>
      </form>
    </div>
  );
}
