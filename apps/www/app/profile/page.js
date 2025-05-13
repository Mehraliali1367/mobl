import { getToken } from "@/actions/auth/loginAction";
import EditForm from "@/components/profile/info/EditForm";
import { getFetch } from "@/utils/fetch";

export default async function ProfilePage() {
  const access_token = await getToken("access-token");

  const profile = await getFetch("/accounts/profile/personal/", {
    Authorization: `Bearer ${access_token.value}`,
  });
  // console.log(profile.response.user);

  return (
    <div className="">
      <EditForm data={profile.response.user} />  
    </div>
  );
}
