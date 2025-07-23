// Filename  - Tabs.js

import { useState } from "react";
import "../../../public/css/tabs.css";
import TabProfileProduct from "./TabProfileProduct";

const TabsProfileProduct = ({ tabs, data }) => {
  const [activeTab, setActiveTab] = useState(0);
  console.log(data);
  

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  return (
    <div className="tabs-container">
      <ul className="tabs tab-nav-list ">
        {tabs.map((tab, index) => (
          <TabProfileProduct
            key={index}
            label={tab.label}
            onClick={() => handleTabClick(index)}
            isActive={index === activeTab}
            className="products-nav-list"
          />
        ))}
      </ul>
      <div className="tab-content">
        <div
          className={activeTab === 0 ? "active tab" : "hidden"}
          dangerouslySetInnerHTML={{ __html: data[0].tab1 }}
        ></div>
        <div className={activeTab === 1 ? "active tab" : "hidden"}>
          Tab 2 is Active
        </div>
        <div className={activeTab === 2 ? "active tab" : "hidden"}>
          Tab 3 is Active
        </div>
      </div>
    </div>
  );
};

export default TabsProfileProduct;
