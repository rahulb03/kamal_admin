import Category from '@/components/category'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import React from 'react'
import { WEBSITE_NAME } from '@/config/constant';

export const metadata = {
  title: `Category - ${WEBSITE_NAME}`,
  description: "",
};

const page = () => {
  return (
    <>
     <DefaultLayout>
         
         <Category />
        
        </DefaultLayout> 
    </>
  )
}

export default page
