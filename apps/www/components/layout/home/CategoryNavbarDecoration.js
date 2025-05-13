import Tabs from "../../products/tabsCategory/Tabs";

export default function CategoryNavbarDecoration({ subcategory }) {
  const category = "decorations"
  return <Tabs tabs={subcategory} category_name={category} />;
}