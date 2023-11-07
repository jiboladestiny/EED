
import Courses from "./datas/Courses";
import CourseCard from "./component/CourseCard";
import courseData from "@/helpers/getAllCourse";
import Link from "next/link";
import { Suspense } from "react";

interface Item {
  _id: number,
  title: string,
  image: string
}

export default async function Home() {
  const course = await courseData();
  return (
    <main className="px-[1rem] sm:px-[5rem] lg:px-[8rem] pt-[1rem]">
      <h2 className="mt-10 sm:text-[34px] text-[25px] font-bold">Courses</h2>
      <p className="">Choose from the following vocational skills</p>

      <div className="grid md:grid-cols-3 grid-cols-1  mt-10 gap-[2rem]">
       <Suspense fallback={<p>Course loading</p>}>
          {course.data.map((item: Item) => {
            return (

              <CourseCard key={item._id} id={item._id} title={item.title} image={item.image} />

            );
          })}
       </Suspense>

        <div className="flex flex-row gap-2 text-[14px] mt-[1rem]">
          <Link href={`/admin`}><span className='font-medium text-green-600 dark:text-green-500 hover:underline'>Admin dashboard</span></Link> <br />
          <Link href={`/admin/instructor`}><span className='font-medium text-green-600 dark:text-green-500 hover:underline'>Instructor dashboard</span></Link>
        </div>
      </div>
    </main>
  );
}
