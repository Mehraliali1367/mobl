import Tabs from "../../products/tabsCategory/Tabs";

export default function CategoryNavbarOffice({ subcategory }) {
  const category = "office";
  return <Tabs tabs={subcategory} category_name={category} />;
}
