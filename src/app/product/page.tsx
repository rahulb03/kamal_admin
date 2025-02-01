import DefaultLayout from '@/components/Layouts/DefaultLaout'
import Product from '@/components/product'
import Home from '@/components/product'
// import ProductTable from '@/components/product/producttable'
import ProductTable from '@/components/product'
import React from 'react'
import { WEBSITE_NAME } from '@/config/constant';

export const metadata = {
  title: `Product - ${WEBSITE_NAME}`,
  description: "",
};

const page = () => {
  return (
    <>

     <DefaultLayout>
        {/* <div>roman reings</div> */}
        {/* <Home /> */}
        <Product />
        </DefaultLayout> 
    </>
  )
}

export default page 
