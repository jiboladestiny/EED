import React from 'react'
import ClientWrapper from '../component/ClientWrapper';
import Users from '../datas/Users'


const page = () => {
  return <div className="px-[1rem] sm:px-[7rem] lg:px-[10rem] min-h-[67vh]">
    <h2 className="mt-10 mb-4 sm:text-[30px] text-[24px] font-bold leading-8">Admin Dashboard</h2>
    <h2 className="mt-2 mb-4 text-gray-500 sm:text-[21px] text-[18px] font-bold leading-8">Users</h2>

    <ClientWrapper users={Users} />

  </div>;


}

export default page
