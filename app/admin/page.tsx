
import ClientWrapper from '../component/ClientWrapper';
import userData from '@/helpers/getAllUsers';
import { Suspense } from 'react';

const page = async () => {
  const users = await userData();
  return <div className="px-[1rem] sm:px-[7rem] lg:px-[10rem] min-h-[67vh]">
    <h2 className="mt-10 mb-4 sm:text-[30px] text-[24px] font-bold leading-8">Admin Dashboard</h2>
  

    <h2 className="mt-2 mb-4 text-gray-500 sm:text-[21px] text-[18px] font-bold leading-8">Users</h2>

    <Suspense fallback={<p>Loading data...</p>}>
      <ClientWrapper users={users?.data} />

    </Suspense>

  </div>;


}

export default page
