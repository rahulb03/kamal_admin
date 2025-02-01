
import LoginPage from '@/components/Auth/Signin/signinpage'
import React from 'react'
import { WEBSITE_NAME } from '@/config/constant';

export const metadata = {
  title: `Login - ${WEBSITE_NAME}`,
  description: "",
};


const page = () => {
  return (
    <>
      <LoginPage />
    </>
  )
}

export default page
