
import Button from '../../component/Button'
import Vedio from '../../component/Vedio'

import summaryData from '@/helpers/getAllSummary'
import Link from 'next/link'


import React from 'react'


type Params = {
    params: {
        sumId: string,
        courseId: string
    }
}

const page = async ({ params: { courseId, sumId } }: Params) => {
    const sumdata = await summaryData()
    const course = sumdata.data.filter((item:any) => item.courseId === courseId);
    const index = course.findIndex((item:any) => item._id === sumId);
    const summary = course.filter((item:any) => item._id === sumId);

    const prevIndex = index - 1;
    const nextIndex = index + 1;

    const prevdata = prevIndex >= 0 ? course[prevIndex]._id : false;
    const nextdata = nextIndex < course.length ? course[nextIndex]._id : false;

    const isFirstCourse = index === 0;
    const isLastCourse = index === course.length - 1;



    return (

        <div className="px-[1rem] sm:px-[7rem] lg:px-[10rem] min-h-[67vh]">

          <h2 className="mt-10 mb-4 sm:text-[34px] text-[28px] font-bold leading-8">{summary[0].outline}</h2>

            <p className='mb-[3rem]'>{summary[0].description}</p>

            <div className='lg:px-[10rem]'>
                <Vedio videoUrl={summary[0].vedio} />
            </div>

            <div className='flex justify-between mt-[3rem]'>
                <div>
                    {!isFirstCourse && prevdata !== false && (
                        <Link href={`/${courseId}/${prevdata}`}>
                            <Button>Prev</Button>
                        </Link>
                    )}
                </div>

                <div>
                    {!isLastCourse && nextdata !== false && (
                        <Link href={`/${courseId}/${nextdata}`}>
                            <Button>Next</Button>
                        </Link>
                    )}
                </div>
            </div>

            <div className='mt-[2rem]'>
                {isLastCourse && (
                    <Link href={`/${courseId}/quiz`}><Button>Take Assestment</Button></Link>
                )}
            </div>  

        </div>

    )
}

export default page
