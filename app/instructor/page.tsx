

import InstructorWrapper from "@/app/component/InstructorWrapper";
import courseData from "@/helpers/getAllCourse";
import { Suspense } from "react";
import { cookies } from 'next/headers'

const page = async () => {
  const course  = await courseData()
  const cookieStore = cookies()
  const id = cookieStore.get('userdata')

  const coursedata: any = course.data.filter((item: any) => item.userId === id?.value)

  return (
    <div className="px-[1rem] sm:px-[7rem] lg:px-[10rem] min-h-[67vh]">
      <h2 className="mt-10 mb-4 sm:text-[30px] text-[24px] font-bold leading-8">Instructor Dashboard</h2>
      <h2 className="mt-2 mb-4 text-gray-500 sm:text-[21px] text-[18px] font-bold leading-8">Course</h2>

      <Suspense fallback={<p>Loading course...</p>}>
        <InstructorWrapper courses={coursedata} />
      </Suspense> 

    </div>
  );
};

export default page;
