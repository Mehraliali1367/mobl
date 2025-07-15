import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const [txtSearch, setTxtSearch] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams();
  const handleSearch = () => {
    params.set("search", txtSearch);
    // console.log('in searchcomponenet:'+params.toString())
    router.replace(`${pathname}?${params.toString()}`);
  };
  const handleBtnTxtSearchRemove = () => {
    document.querySelector("#txtSearch").value = "";
    setTxtSearch("");
    params.delete("search");
    router.replace(`${pathname}`);
  };
  const onChange = (e) => {
    setTxtSearch(e.target.value);
    if (e.target.value.trim() === "") {
      handleBtnTxtSearchRemove();
    }
  };
  return (
    <div className="search-page-products">
      <div>
        <label className="form-label">جستجو</label>
        <span
          onClick={() => {
            handleBtnTxtSearchRemove();
          }}
          className={txtSearch === "" ? "close-icon hide" : "close-icon"}
          type="reset"
        ></span>
      </div>

      <div className="input-group">
        <input
          type="text"
          id="txtSearch"
          className="form-control"
          placeholder="نام محصول ..."
          value={txtSearch}
          onChange={(e) => onChange(e)}
        />

        <button
          onClick={() => {
            txtSearch !== "" && handleSearch();
          }}
          className="btn-group-text cursor"
        >
          <i className="bi bi-search"></i>
        </button>
      </div>
    </div>
  );
}
