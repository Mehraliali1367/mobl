import Loading from "../../components/products/Loading";
// import ProductList from "../../components/products/ProductList";
import ListProduct from "../../components/products/ListProduct/ListProduct.js";
import "../../public/css/productsPage.css";
// import { Suspense } from "react";
import { getFetch } from "../../utils/fetch";
import { Suspense } from "react";

export default async function productsPage({ searchParams }) {
  const { search, page, sort } = await searchParams;
  //   data = await getFetch(
  //   `/products/ProductList/?page=1&subcategories=${arr.join()}&sort=${sort}`
  // );
  const data = await getFetch(
    `/products/SearchList/?page=${page ? page : 1}&search=${search}&sort=${
      sort ? sort : "max"
    }`
  );
  console.log(data.response.results);
  const result = data.response.results;
  return (
    <>
      <section className="products">
        <Suspense fallback={<Loading />}>
          {/* <ProductList /> */}
          <ListProduct products={result} />
        </Suspense>
      </section>
    </>
  );
}
