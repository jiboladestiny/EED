
import Courses from "./datas/Courses";
import CourseCard from "./component/CourseCard";
import Progress from "./component/Progress";

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

   <Progress/>
      </div>
    </main>
  );
}
