import React from 'react';
import Courses from '../datas/Courses';
import Link from 'next/link';
import Summary from '../datas/Summary';
import arrowright from '../../public/icons/arrrowright.png'
import Image from 'next/image';
import courseData from '@/helpers/getAllCourse';
import summaryData from '@/helpers/getAllSummary';
import enrolledCourseData from '@/helpers/getAllEnrolledCourse';


interface Course {
  _id: number;
  title: string;
  description: string;
  image: string;
}

interface SummaryItem {
  courseId: number;
  // other properties in SummaryItem
}

const Page: React.FC = async () => {
  const course = await courseData();
  const summarydata = await summaryData();
  const enrolled = await enrolledCourseData();

  const enrolledCourses = course.data.filter((item: any) =>
    enrolled.data.some((enrollItem: any) => item._id === enrollItem.courseId)
  );

  return (
    <div className="px-[1rem] sm:px-[7rem] lg:px-[10rem] min-h-[67vh]">
      <h2 className="mt-10 mb-4 sm:text-[30px] text-[24px] font-bold leading-8">User Dashboard</h2>
      <h2 className="mt-2 mb-4 text-gray-500 sm:text-[21px] text-[18px] font-bold leading-8">Course</h2>
      {JSON.stringify(enrolledCourses)}
      <ul className='quiz mb-[5rem]' >
        {enrolledCourses.map((course: Course) => {
          const courseSummary = summarydata.data.find((item: any) => item.courseId === course._id);
          return (
            <li key={course._id} className='flex justify-between items-end li-hover'>
              <span>{course.title}</span>

              <Link href={`/${course._id}/${courseSummary?._id}`}>
                <span className='flex gap-1 bg-[whitesmoke] p-[0.5rem]  items-center'>Resume <Image alt='arrow' src={arrowright} height={16} width={16} /></span>
              </Link>

            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Page;
