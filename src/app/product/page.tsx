import DefaultLayout from '@/components/Layouts/DefaultLaout'
import Product from '@/components/product'
import Home from '@/components/product'
// import ProductTable from '@/components/product/producttable'
import ProductTable from '@/components/product'
import React from 'react'

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
