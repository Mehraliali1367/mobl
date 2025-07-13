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
  return (
    <div className="search-page-products">
      <label className="form-label">جستجو</label>

      <div className="input-group">
        <input
          type="text"
          id="txtSearch"
          className="form-control"
          placeholder="نام محصول ..."
          value={txtSearch}
          onChange={(e) => setTxtSearch(e.target.value)}
        />
        <span
          onClick={() => {
            handleBtnTxtSearchRemove();
          }}
          className={txtSearch === "" ? "close-icon hide" : "close-icon"}
          type="reset"
        ></span>
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
