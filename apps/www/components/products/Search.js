import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const [txtSearch, setTxtSearch] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = () => {
    const value = txtSearch;
    const params = new URLSearchParams();
    if (value.length > 0) {
      params.set("search", value.toString());
      router.replace(`${pathname}?search=${value.toString()}`);
    }
  };
  const handleBtnTxtSearchRemove = () => {
    document.querySelector("#txtSearch").value = "";
    setTxtSearch("");
    const params = new URLSearchParams();
      params.delete("search",);
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
          onClick={() => handleSearch()}
          className="btn-group-text cursor"
        >
          <i className="bi bi-search"></i>
        </button>
      </div>
    </div>
  );
}
