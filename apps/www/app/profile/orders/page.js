import { getToken } from "../actions/auth/loginAction";
import Order from "../components/profile/orders/order";
import { getFetch } from "../utils/fetch";

export default async function Orders() {
  const access_token = await getToken("access-token");
  const data = await getFetch("/orders/order_list/", {
    Authorization: `Bearer ${access_token.value}`,
  });
  return <>{data.status_code == 200 && <Order data={data.response} />}</>;
}
