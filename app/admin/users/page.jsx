import React from "react";
// import getAllUsers from "@/app/libs/getAllUsers";
// import ClientWrapper from "@/app/component/ClientWrapper";

const page = async () => {
  const usersData = getAllUsers();
  const users = await usersData;
  return (
    <div className="px-[1rem] sm:px-[5rem] pt-[1rem]">
      <h2 className="font-bold text-[24px] mt-2 mb-6">Users</h2>

      {/* <Suspense fallback={<div>Loading...</div>}>
        <ClientWrapper users={users} />
      </Suspense>*/}
    </div>
  );
};

export default page;
