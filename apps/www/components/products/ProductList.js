"use client";

import { Suspense, useEffect, useState } from "react";
import Cart from "./Card";
import { getFetch } from "../../utils/fetch";
import Loading from "./Loading";
import SideBar from "./SideBar";
import { useSearchParams } from "next/navigation";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [nextPage, setNextPage] = useState(1);
  const [flag, setFlag] = useState("");
  // sidebar
  const [subcategory, setSubcategory] = useState([]);
  const [checkboxes, setCheckboxs] = useState([]);
  const [radioboxSort, setRadioboxSort] = useState("max");
  const [txtSearch, setTxtSearch] = useState("");

  const params = useSearchParams();

  const handleChangeTxtSearch = (e) => {
    setTxtSearch(e.target.value);
    setCheckboxs([]);
  };
  const LoadNewData = async (arr, sort = "max") => {
    let data = null;
    setProducts([]);
    setNextPage(1);
    data = await getFetch(
      `/products/ProductList/?page=1&subcategories=${arr.join()}&sort=${sort}`
    );

    checkStatusData(data);
  };
  const handleBtnSearch = async () => {
    // console.log("vrod be changeSubcategory");

    let data = null;
    setProducts([]);
    setNextPage(1);
    data = await getFetch(
      `/products/SearchList/?page=1&search=${txtSearch}&sort=${radioboxSort}`
    );
    setFlag("search");
    checkStatusData(data);
  };
  const handleBtnInpuSearchRemoveText = () => {
    setTxtSearch("");
  };
  const loadSubcategory = async () => {
    const subcategory = await getFetch("/products/subcategory/");
    setSubcategory(subcategory.response);
  };
  function sleeper(ms) {
    return function (x) {
      return new Promise((resolve) => setTimeout(() => resolve(x), ms));
    };
  }
  const handelCheckBoxClick = (e) => {
    // console.log(e);

    let el = e.target.name;
    let arr = checkboxes;
    var index = arr.indexOf(el);

    if (index === -1) {
      arr = [...arr, el];
    } else {
      arr.splice(index, 1);
    }
    setCheckboxs([...arr]);
    setFlag("checkbox");
    setTxtSearch("");
    LoadNewData(arr, radioboxSort);
  };
  const handleRadioboxClick = (e) => {
    setRadioboxSort(e.target.id);
    setProducts([]);
    setNextPage(1);
  };
  // Endsidebar

  const loadMoreProduct = async () => {
    let data = null;
    if (txtSearch.length > 0 && flag === "search") {
      data = await getFetch(
        `/products/SearchList/?page=${nextPage}&search=${txtSearch}&sort=${radioboxSort}`
      );
    }
    if (checkboxes.length > 0 && flag === "checkbox") {
      data = await getFetch(
        `/products/ProductList/?page=${nextPage}&subcategories=${checkboxes.join()}&sort=${radioboxSort}`
      );
    }
    if (checkboxes == 0 && txtSearch == 0) {
      // console.log("is not  checkbox loadMoreProduct");
      data = await getFetch(
        `/products/ProductList/?page=${nextPage}&sort=${radioboxSort}`
      );
    }

    checkStatusData(data);
  };

  const checkStatusData = (data) => {
    // console.log("vrod be checkStatusData");
    data = data.response;
    // console.log(data);

    if (data) {
      if (!data.next) {
        setHasMoreData(false);
      } else {
        setHasMoreData(true);
      }
      if (data.results)
        setProducts((prevProducts) => [...prevProducts, ...data.results]);
      if (data.next !== "") setNextPage((prevNextPage) => prevNextPage + 1);
    }
  };

  useEffect(() => {
    if (params.has("subcategory")) {
      const paramSubcategory = params.get("subcategory");
      setCheckboxs([paramSubcategory]);
      setFlag("checkbox");
    }
    loadSubcategory();
    loadMoreProduct();
  }, [radioboxSort]);
  return (
    <>
      <SideBar
        subcategory={subcategory}
        txtSearch={txtSearch}
        checkboxes={checkboxes}
        onClick={(e) => handelCheckBoxClick(e)}
        onSort={(e) => handleRadioboxClick(e)}
        onChangeInput={(e) => handleChangeTxtSearch(e)}
        onClickBtnRemoveInputSearch={() => handleBtnInpuSearchRemoveText()}
        onClickBtnSearch={() => handleBtnSearch()}
      />
      <article className="container-products">
        <div className="products-wrapper" id="products-wrapper">
          {products ? (
            products.length !== 0 ? (
              <>
                {products.map((product, index) => (
                  <Suspense key={index} fallback={<Loading />}>
                    <Cart key={index} product={product} />
                  </Suspense>
                ))}
              </>
            ) : (
              <>
                <div className="message-info">موردی یافت نشد</div>
                {/* <Loading /> */}
              </>
            )
          ) : (
            <>
              <div className="message-error">
                خطای در دریافت اطلاعات رخ داده است
              </div>
            </>
          )}
        </div>
        <div className="text-center mt-5">
          {hasMoreData ? (
            <div className="section-center-box">
              <button
                className="btn btn-other-product"
                onClick={loadMoreProduct}
              >
                مشاهده ادامه محصولات این گروه
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </article>
    </>
  );
}
