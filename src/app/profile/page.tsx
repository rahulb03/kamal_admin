import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { WEBSITE_NAME } from "@/config/constant";
import ProfilePage from "@/components/ProfileBox/profile";

export const metadata: Metadata = {
  
  title : `Profile - ${WEBSITE_NAME}`,
  description: "",
   
};

const Profile = () => {
  return (
    <DefaultLayout>
      {/* <div className="mx-auto w-full max-w-[970px]"> */}
        {/* <Breadcrumb pageName="Profile /> */}

        <ProfilePage />
      {/* </div> */}
    </DefaultLayout>
  );
};

export default Profile;
