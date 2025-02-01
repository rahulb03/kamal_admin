


import RegisterPage from '@/components/Auth/signup/signuppage'
import React from 'react'
import { WEBSITE_NAME } from '@/config/constant'

export const metadata =  { 
  title: `Register - ${WEBSITE_NAME}`,
  description: 'Create an account to access your dashboard',  
}


const page = () => {
  return (
    <>
      <RegisterPage />
    </>
  )
}

export default page
