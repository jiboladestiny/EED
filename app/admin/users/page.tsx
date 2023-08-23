import React from "react";
// import getAllUsers from "@/app/libs/getAllUsers";
// import ClientWrapper from "@/app/component/ClientWrapper";

const page = async () => {
  // const usersData = getAllUsers();
  // const users = await usersData;
  return (
    <div className="px-[1rem] sm:px-[5rem] pt-[1rem]">
      <h2 className="mt-10 mb-4 sm:text-[30px] text-[24px] font-bold leading-8">User Dashboard</h2>
      <h2 className="mt-2 mb-4 text-gray-500 sm:text-[21px] text-[18px] font-bold leading-8">Course</h2>

      {/* <Suspense fallback={<div>Loading...</div>}>
        <ClientWrapper users={users} />
      </Suspense>*/}
    </div>
  );
};

export default page;
