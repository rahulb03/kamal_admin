import EnhancedInventoryOverview from '@/components/Dashboard'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import React from 'react'

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
