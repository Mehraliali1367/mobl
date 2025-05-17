import TypesProducts from "../components/layout/home/TypesProducts";
import { getFetch } from "../utils/fetch";
import CategoryNavbarSofa from "../components/layout/home/CategoryNavbarSofa";
import CategoryNavbarBed from "../components/layout/home/CategoryNavbarBed";
import CategoryNavbarOffice from "../components/layout/home/CategoryNavbarOffice";
import CategoryNavbarDecoration from "../components/layout/home/CategoryNavbarDecoration";
import Divider from "../components/layout/home/Divider";
import baner1 from "../public/images/baner/baner1.jpg";
import baner2 from "../public/images/baner/baner2.jpg";
import Feature from "../components/layout/home/Feature";
import Script from "next/script";
import HeaderSlider from "../components/layout/carousel/HeaderSlider";

export default async function home() {
  const data = (await getFetch("/products/category_products/")).response;
  
  return (
    <>
      <HeaderSlider />
      <TypesProducts />

      <CategoryNavbarSofa subcategory={data} />
      <CategoryNavbarBed subcategory={data} />
      <CategoryNavbarDecoration subcategory={data} />

      <Divider img_src={baner1} />

      <CategoryNavbarOffice subcategory={data} />
      <Divider img_src={baner2} />

      <Feature />
      {/* <!--End Features --> */}

      <Script src="/js/slider-header.js"></Script>
    </>
  );
}
