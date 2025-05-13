import React, { useState } from "react";

const TabProfileProduct = ({ label, onClick, isActive }) => (
  <li
    className={`tab ${isActive ? "active" : ""}`}
    onClick={onClick}
  >
    <a className="tab-nav-link nav-link-ltr">{label}</a>
  </li>
);

export default TabProfileProduct;
