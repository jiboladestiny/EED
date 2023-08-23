import React from 'react';
import Courses from '../datas/Courses';
import Link from 'next/link';
import Summary from '../datas/Summary';
import arrowright from '../../public/icons/arrrowright.png'
import Image from 'next/image';

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface SummaryItem {
  courseId: number;
  // other properties in SummaryItem
}

const Page: React.FC = () => {
  return (
    <div className="px-[1rem] sm:px-[7rem] lg:px-[10rem] min-h-[67vh]">
      <h2 className="mt-10 mb-4 sm:text-[30px] text-[24px] font-bold leading-8">User Dashboard</h2>
      <h2 className="mt-2 mb-4 text-gray-500 sm:text-[21px] text-[18px] font-bold leading-8">Course</h2>

      <ul className='quiz mb-[5rem]' >
        {Courses.map((course: Course) => {
          const courseSummary = Summary.find((item: SummaryItem) => item.courseId === course.id);
          return (
            <li key={course.id} className='flex justify-between items-end li-hover'>
              <span>{course.title}</span>

              <Link href={`/${course.id}/${courseSummary?.id}`}>
                <span className='flex gap-1 bg-[whitesmoke] p-[0.5rem]  items-center'>Resume <Image alt='arrow' src={arrowright} height={16} width={16} /></span>
              </Link>

            </li>
          );
        })}
      </ul>

      <Link href={`/admin`}><span className='font-medium text-green-600 dark:text-green-500 hover:underline'>Admin dashboard</span></Link>
    </div>
  );
};

export default Page;
