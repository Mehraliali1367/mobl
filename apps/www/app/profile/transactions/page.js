import { getToken } from "../actions/auth/loginAction";
import Transactions from "../components/profile/transactions/transactions";
import { getFetch } from "../utils/fetch";

export default async function Orders() {
  const access_token = await getToken("access-token");
  const data = await getFetch("/orders/tran_list/", {
    Authorization: `Bearer ${access_token.value}`,
  });
  return <>{data.status_code == 200 && <Transactions data={data.response} />}</>;
}
