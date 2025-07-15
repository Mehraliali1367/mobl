"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Rank() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleRadioboxClick = (e) => {
    params.set("sort", e.target.id);
    router.replace(`${pathname}?${params.toString()}`);
  };
  
  return (
    <div className="filter-list">
      <h3>ترتیب</h3>
      <div className="container-filter-list" id="filters-container-price">
        <div className="filter-list-item">
          <div className="item">
            <label className="radio-container">
              <input
                type="radio"
                id="max"
                name="radio"
                onClick={(e) => handleRadioboxClick(e)}
                defaultChecked
              />
              <span className="radio-checkmark"></span>
              بیشترین قیمت
            </label>
          </div>
          <div className="item">
            <label className="radio-container">
              <input
                type="radio"
                id="min"
                name="radio"
                onClick={(e) => handleRadioboxClick(e)}
              />
              <span className="radio-checkmark"></span>
              کمترین قیمت
            </label>
          </div>
          {/* <div className="item">
              <label className="radio-container">
                <input
                  type="radio"
                  id="bestseller"
                  name="radio"
                  onClick={(e)=>handleRadioboxClick(e)}
                />
                <span className="radio-checkmark"></span>
                پرفروش ترین
              </label>
            </div> */}
          <div className="item">
            <label className="radio-container">
              <input
                type="radio"
                id="discount"
                name="radio"
                onClick={(e) => handleRadioboxClick(e)}
              />
              <span className="radio-checkmark"></span>
              باتخفیف
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
