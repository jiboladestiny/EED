import React from 'react';

import courseData from '@/helpers/getAllCourse';
import summaryData from '@/helpers/getAllSummary';
import enrolledCourseData from '@/helpers/getAllEnrolledCourse';
import UserWrapper from '../component/UserWrapper';
import { cookies } from 'next/headers'




const Page: React.FC = async () => {
  const course = await courseData();
  const summarydata = await summaryData();
  const enrolled = await enrolledCourseData();
  const cookieStore = cookies()
  const userid:any = cookieStore.get('userdata')

  const enrolledCourses = course.data.filter((item: any) =>
    enrolled.data.some((enrollItem: any) => item._id === enrollItem.courseId && enrollItem.userId === userid.value)
  );

  

  return (
    <div className="px-[1rem] sm:px-[7rem] lg:px-[10rem] min-h-[67vh]">
      <h2 className="mt-10 mb-4 sm:text-[30px] text-[24px] font-bold leading-8">User Dashboard</h2>
      <h2 className="mt-2 mb-4 text-gray-500 sm:text-[21px] text-[18px] font-bold leading-8">Course</h2>
      {/* {JSON.stringify(enrolledCourses)} */}
     <UserWrapper summarydata={summarydata.data} enrolledCourses={enrolledCourses} enrolled={enrolled.data}/>
    </div>
  );
};

export default Page;
