import Product from "../../../components/products/Product";
import { getFetch } from "../../../utils/fetch";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../public/css/productPage.css";
export default async function ProductPage({ params }) {
  const { slug } = await params;
  const data = await getFetch(`/products/DetailProduct/${decodeURI(slug)}/`);

  return <> <Product product={data}/></>;
}
