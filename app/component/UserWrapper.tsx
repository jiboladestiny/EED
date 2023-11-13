import Image from 'next/image';
import Link from 'next/link';
import arrowright from '../../public/icons/arrrowright.png'

interface Course {
    _id: number;
    title: string;
    description: string;
    image: string;
}

interface userProps {
    enrolledCourses: [],
    summarydata:[],
    enrolled:[]
}

const UserWrapper = ({enrolledCourses,summarydata,enrolled}: userProps) => {
  return (
 
          <ul className='quiz mb-[5rem]' >
          {/* {JSON.stringify(enrolledCourses)} */}
          {/* {JSON.stringify(enrolled)} */}
     
              {enrolledCourses.map((course: Course) => {
                  const courseSummary:any = summarydata.find((item: any) => item.courseId === course._id);
                  
                  return (
                      <li key={course._id} className='flex justify-between items-end li-hover'>
                          <span>{course.title}</span>

                          <Link href={`/${course._id}/${courseSummary?._id}`}>
                              <span className='flex gap-1 bg-[whitesmoke] p-[0.5rem]  items-center'>Start <Image alt='arrow' src={arrowright} height={16} width={16} /></span>
                          </Link>

                      </li>
                  );
              })}
         </ul>
  
  )
}

export default UserWrapper