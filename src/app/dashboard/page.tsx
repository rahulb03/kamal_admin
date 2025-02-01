import EnhancedInventoryOverview from '@/components/Dashboard'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import React from 'react'
import { WEBSITE_NAME } from '@/config/constant';

// const pageName = 'Dashboard'
export const metadata = {
  title: `dashboard - ${WEBSITE_NAME} `,
  description: "",
};


const page = () => {
  return (
    <>
    <DefaultLayout >
     <EnhancedInventoryOverview />
     </DefaultLayout>
    </>
  )
}

export default page
