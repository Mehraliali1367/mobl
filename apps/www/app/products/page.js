import Loading from "../../components/products/Loading";
import ProductList from "../../components/products/ProductList";
import "../../public/css/productsPage.css";
import { Suspense } from "react";

export default function productsPage() {
  return (
    <section className="products">
      <Suspense fallback={<Loading />}>
        <ProductList />
      </Suspense>
    </section>
  );
}
