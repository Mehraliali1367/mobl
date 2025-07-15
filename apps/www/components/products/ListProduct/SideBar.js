"use client";
import { getFetch } from "../../../utils/fetch";
import { useEffect, useState } from "react";
import Search from "./Search";
import { usePathname, useRouter } from "next/navigation";
import Rank from "./Rank";
export default function () {
  const [subcategory, setSubcategory] = useState([]);
  const [checkboxes, setCheckboxs] = useState([]);
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams();

  const loadSubcategory = async () => {
    const subcategory = await getFetch("/products/subcategory/");
    setSubcategory(subcategory.response);
  };

  useEffect(() => {
    loadSubcategory();
  }, []);

  const handelCheckBoxClick = (e) => {
    let el = e.target.name;
    let arr = checkboxes;
    var index = arr.indexOf(el);

    if (index === -1) {
      arr = [...arr, el];
    } else {
      arr.splice(index, 1);
    }

    setCheckboxs([...arr]);
    params.set("subcategories", arr.join());
    // console.log('in searchcomponenet:'+params.toString())
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <article className="products-side-bar">
      <Search />
      <Rank />
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
                            onChange={(e) => handelCheckBoxClick(e)}
                            checked={checkboxes.includes(item.name)}
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
    </article>
  );
}
