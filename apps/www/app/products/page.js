import Loading from "../../components/products/Loading";
// import ProductList from "../../components/products/ProductList";
import ListProduct from "../../components/products/ListProduct/ListProduct.js";
import "../../public/css/productsPage.css";
// import { Suspense } from "react";
import { getFetch } from "../../utils/fetch";
import { Suspense } from "react";

export default async function productsPage({ searchParams }) {
  const { search, category, subcategories, page, sort } = await searchParams;

  let data = null;
if (category) {
     data = await getFetch(
      `/products/SearchList/?page=${page ? page : 1}&category=${category}&sort=${
        sort ? sort : "max"
      }`
    );
}
  if (search) {
    data = await getFetch(
      `/products/SearchList/?page=${page ? page : 1}&search=${search}&sort=${
        sort ? sort : "max"
      }`
    );
  } else {
    data = await getFetch(
      `/products/ProductList/?page=${page ? page : 1} &subcategories=${
        subcategories ? subcategories : ""
      }&sort=${sort ? sort : "max"}`
    );
  }

  const result = data.response;
  return (
    <>
      <section className="products">
        <Suspense fallback={<Loading />}>
          <ListProduct data={result} />
        </Suspense>
      </section>
    </>
  );
}
