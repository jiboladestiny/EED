import React from "react";
import Button from "../component/Button";
import Courses from "../datas/Courses";
import Summary from "../datas/Summary";
import Link from "next/link";

type Params = {
  params: {
    courseId: string
  }
}

const Page = ({ params: { courseId } }: Params) => {
  const data = Courses.filter((item) => item.id === parseInt(courseId));
  const summary = Summary.filter((item) => item.courseId === parseInt(courseId));
  return (
    <div className="px-[1rem] sm:px-[7rem] lg:px-[10rem] min-h-[67vh]">
      <div
        style={{
          backgroundImage: `url(${data[0].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-[50vh] w-full relative"
      >
        <div className="absolute w-full h-full bg-black/40 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <h2 className="text-white sm:text-[40px] text-[30px] font-semibold">
              {data[0].title}
            </h2>

            <Button>{data[0].instructor}</Button>
          </div>
        </div>
      </div>

      <div className="md:px-[2rem] mt-[3.5rem]">

        <h2 className="text-[25px] font-semibold mb-[1rem]">Course Summary:</h2>
        <p>{data[0].description}</p>
        <h2 className="text-[25px] font-semibold mt-[3.5rem] mb-[1rem]">
          What you will learn in this course:
        </h2>




        {summary.map((item)=>{
          return (
            <div key={item.id} className="collapse collapse-plus bg-gray-100">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-[18px] font-medium">
                {item.outline}
              </div>
              <div className="collapse-content bg-white">
                <p>{item.description}</p>
              </div>
            </div>
          );
        })}


        <div className="mt-[3rem]"></div>
        <Link href={`/login`}><Button>Take Course</Button></Link>
      </div>
    </div>
  );
};

export default Page;
