"use client";
import { NewAddressAction } from "../../actions/profile/profileAction";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function NewAddress({ provinces, cities }) {
  const [stateDisplay, setStateDisplay] = useState("hidden");
  const [stateCities, setStateCities] = useState([]);
  const [stateNewAddress, formActionNewAddress, is_pending] = useActionState(
    NewAddressAction,
    {}
  );
  useEffect(() => {
    if (stateNewAddress?.status_code === "error") {
      toast.error(stateNewAddress.message, {
        className: "Custom__Toastify",
        // autoClose: false,
      });
    }
    if (stateNewAddress?.status_code === 200) {
      toast.success("آدرس جدید با موفقیت ذخیره شد.");
    }
    if (stateNewAddress?.status_code === 400) {
      toast.warning("اطلاعات وارد شده معتبر نیست.");
    }
  }, [stateNewAddress]);
  const toggleShow = () => {
    if (stateDisplay === "hidden") {
      setStateDisplay("");
    } else {
      setStateDisplay("hidden");
    }
  };
  const changeProvince = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const option =  el.getAttribute('id');  
    setStateCities(cities.filter((city) => city.provinceId == option));
  };
  return (
    <>
      <button
        className="btn btn-new-address"
        onClick={() => {
          toggleShow();
        }}
      >
        ایجاد آدرس جدید
      </button>
      <div
        className={
          stateDisplay === "hidden" ? "hidden" : "profile-address-form"
        }
      >
        <form action={formActionNewAddress}>
          <div className="group-box-input">
            <div className="group-control-input">
              <label className="form-label">عنوان</label>
              <input type="text" name="title" className="form-control" />
            </div>
            <div className="group-control-input">
              <label className="form-label">شماره تماس</label>
              <input type="text" name="tel" className="form-control" />
            </div>
          </div>
          <div className="group-box-input">
            <div className="group-control-input">
              <label className="form-label">استان</label>
              <select
                name="province"
                className="form-control"
                onChange={changeProvince}
              >
                <option>------</option>
                {provinces.map((province,index) => (
                  <option key={index} id={province.provinceId} value={province.id}>
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
              <input type="text" name="postal_code" className="form-control " />
            </div>
          </div>
          <div className="group-control-input">
            <label className="form-label">آدرس</label>
            <textarea
              rows={5}
              type="text"
              name="address"
              className="form-control "
            />
          </div>

          <button
            className={is_pending ? "loading profile-btn" : "btn profile-btn"}
            disabled={is_pending}
          >
            {!is_pending && "ایجاد"}
          </button>
        </form>
      </div>
    </>
  );
}
