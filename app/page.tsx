
import Courses from "./datas/Courses";
import CourseCard from "./component/CourseCard";
import Progress from "./component/Progress";
import Link from "next/link";

interface Item {
  id: number,
  title: string,
  image: string
}

export default async function Home() {
  return (
    <main className="px-[1rem] sm:px-[5rem] lg:px-[8rem] pt-[1rem]">
      <h2 className="mt-10 sm:text-[34px] text-[25px] font-bold">Courses</h2>
      <p className="">Choose from the following vocational skills</p>

      <div className="grid md:grid-cols-3 grid-cols-1  mt-10 gap-[2rem]">
        {Courses.map((item: Item) => {
          return (

            <CourseCard key={item.id} id={item.id} title={item.title} image={item.image} />

          );
        })}

        <div className="flex flex-row gap-2 text-[14px] mt-[1rem]">
          <Link href={`/admin`}><span className='font-medium text-green-600 dark:text-green-500 hover:underline'>Admin dashboard</span></Link> <br />
          <Link href={`/admin/instructor`}><span className='font-medium text-green-600 dark:text-green-500 hover:underline'>Instructor dashboard</span></Link>
        </div>
      </div>
    </main>
  );
}
