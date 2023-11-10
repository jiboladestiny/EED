import React, { useState } from "react";
import Button from "../component/Button";
import courseData from "@/helpers/getAllCourse";
import summaryData from "@/helpers/getAllSummary";
import enrolledCourseData from "@/helpers/getAllEnrolledCourse";
import userData from "@/helpers/getAllUsers";
import { cookies } from 'next/headers'
import CourseButton from "../component/CourseButton";

type Params = {
  params: {
    courseId: string
  }
}

const Page = async ({ params: { courseId } }: Params) => {
  const course = await courseData();
  const summarydata = await summaryData();
  const enrolled = await enrolledCourseData();
  const user = await userData();
  const cookieStore = cookies()
  const userid: any = cookieStore.get('userdata')
  const data =  course.data.filter((item: any) => item._id === courseId);
  const summary =  summarydata.data.filter((item:any) => item.courseId === courseId);

  const enrolleddata =  enrolled.data.filter((item: any) => item.userId === userid.value);
  const ifcourse = enrolleddata.filter((item: any) => item.courseId === courseId);

  const hasValues = ifcourse.length > 0;

  const instructor = user.data.filter((item: any) =>
    course.data.some((userItem: any) => item._id === userItem.userId)
  );

  const userenrollinfo = {
    userId: userid.value,
    courseId: courseId
  }



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

            <Button>{instructor[0].name}</Button>
          </div>
        </div>
      </div>

      <div className="md:px-[2rem] mt-[3.5rem]">

        <h2 className="text-[25px] font-semibold mb-[1rem]">Course Summary:</h2>

        <p>{data[0].description}</p>
        <h2 className="text-[25px] font-semibold mt-[3.5rem] mb-[1rem]">
          What you will learn in this course:
        </h2>




        {summary.map((item:any) => {
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
        <CourseButton courseId={userenrollinfo} hasValues={hasValues} />
      </div>
    </div>
  );
};

export default Page;
