"use client";
import { useEffect, useState } from "react";
import Tab from "./Tab";
import Slider from "../../products/slider/Slider";
import "../../../public/css/tabs.css"

const Tabs = ({ tabs, category_name }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [products, setProducts] = useState([]);
  const category = category_name;
  const findTabCategory = "ul_" + category_name;
  let name_persian = "";
  
  const handleTabClick = (index, products) => {
    setActiveTab(index);
    setProducts(products);
  };
  
  tabs.forEach((element) => {
    element.name == category ? (name_persian = element.name_persian) : "";
  });

  useEffect(() => {
    // baraye  ejra shodan avalin tab ta mahsolat ta an goroh ra nemayesh bedahad
    const cls_obj = "." + findTabCategory + ">" + "li";
    const itemcClick = document.querySelector(cls_obj);
    itemcClick.click();
    // end
  }, []);

  return (
    <div className="tabs-container">
      <div className="tabs">
        <article className="products-art">
          <div className="product-baner">
            <div className="section-center">
              <div className="product-baner-title">
                <h3>{name_persian}</h3>
              </div>
              <div className="products-nav">
                <ul className={`tab-nav-list ${findTabCategory}`}>
                  {tabs.map((list) =>
                    list.name === category
                      ? list.category.map((sub_list, index) => (
                          <Tab
                            key={index}
                            label={sub_list.name_persian}
                            onClick={() =>
                              handleTabClick(index, sub_list.products)
                            }
                            isActive={index === activeTab}
                            className="tab-nav-list"
                            id={sub_list.name}
                            setactiveItem={sub_list.name}
                          />
                        ))
                      : ""
                  )}
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div className="tab-content">
        {products ? <Slider products={products} /> : ""}
      </div>
    </div>
  );
};

export default Tabs;
