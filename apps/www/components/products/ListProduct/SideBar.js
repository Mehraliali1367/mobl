"use client";
import { getFetch } from "../../../utils/fetch";
import { useEffect, useState } from "react";
import Search from "./Search";
export default function (
  {
    // subcategory,
    // checkboxes,
    // txtSearch,
    // onClick,
    // onSort,
    // onChangeInput,
    // onClickBtnRemoveInputSearch,
    // onClickBtnSearch,
  }
) {
  const [subcategory, setSubcategory] = useState([]);
  const loadSubcategory = async () => {
    const subcategory = await getFetch("/products/subcategory/");
    setSubcategory(subcategory.response);
  };
  useEffect(() => {
    loadSubcategory();
  }, []);
  return (
    <article className="products-side-bar">
      <Search />
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
                  // onClick={onSort}
                  defaultChecked
                />
                <span className="radio-checkmark"></span>
                بیشترین قیمت
              </label>
            </div>
            <div className="item">
              <label className="radio-container">
                {/* onClick={onSort} */}
                <input type="radio" id="min" name="radio" />
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
                  onClick={(e) => setRadioboxSort(e.target.id)}
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
                  // onClick={onSort}
                />
                <span className="radio-checkmark"></span>
                باتخفیف
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="filter-list">
        <h3>دسته بندی</h3>
        <div className="container-filter-list" id="filters-container-product">
          <div className="filter-list-item">
            {subcategory.map((category, index) => (
              <div key={index}>
                <div
                  className="subject"
                  name={category.name}
                  id={category.name}
                >
                  {category.name_persian}
                </div>
                <div className="container-filter-list">
                  <div className="filter-list-item">
                    {category.category.map((item, index) => (
                      <div key={index} className="item">
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            id={item.name}
                            name={item.slug}
                            className="check"
                            // onClick={(e) => handleChange(e)}
                            // onChange={onClick}
                            // checked={checkboxes.includes(item.name)}
                          />
                          <span className="checkbox-checkmark"></span>
                          {item.name_persian}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="right"></div>
    </article>
  );
}
