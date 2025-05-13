import Tabs from "../../products/tabsCategory/Tabs";

export default function CategoryNavbarSofa({ subcategory }) {
  const category = "sofa";
  return <Tabs tabs={subcategory} category_name={category} />;
}
