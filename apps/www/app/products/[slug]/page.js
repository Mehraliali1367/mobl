import Product from "../../../components/products/Product";
import { getFetch } from "../../../utils/fetch";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const data = await getFetch(`/products/DetailProduct/${decodeURI(slug)}/`);

  return <> <Product product={data}/></>;
}
