import Tabs from "../../products/tabsCategory/Tabs";

export default function CategoryNavbarBed({ subcategory }) {
  const category = "bed"
  return <Tabs tabs={subcategory} category_name={category} />;
}
 