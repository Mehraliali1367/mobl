import { getToken } from "../../../actions/auth/loginAction";
import EditAddress from "../../../components/profile/address/editAddress";
import NewAddress from "../../../components/profile/address/newAddress";
import { getFetch } from "../../../utils/fetch";

export default async function Addresses() {
  const access_token = await getToken("access-token");
  const profile = await getFetch("/accounts/profile/personal/", {
    Authorization: `Bearer ${access_token.value}`,
  });
  
  const Alladdress = profile.response.addresses;

  return (
    <div key={profile.response.id}>
      <NewAddress
        provinces={profile.response.province}
        cities={profile.response.cities}
      />
      <hr />
      <h3 className="mt-1">آدرس های من</h3>
      {Alladdress.length > 0
        ? Alladdress.map((address) => (
            <EditAddress
              key={address.id}
              provinces={profile.response.province}
              cities={profile.response.cities}
              address={address}
            />
          ))
        : ""}
    </div>
  );
}
