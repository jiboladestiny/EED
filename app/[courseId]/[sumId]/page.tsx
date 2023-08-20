'use client'
import Button from '@/app/component/Button'
import Vedio from '@/app/component/Vedio'
// import Section from '@/app/component/Section'
import Summary from '@/app/datas/Summary'
import Link from 'next/link'
// import next from 'next/types'
// import { nextTick } from 'process'

import React from 'react'


type Params = {
    params: {
        sumId: string,
        courseId: string
    }
}

const page = ({ params: { courseId, sumId } }: Params) => {

    const course = Summary.filter((item) => item.courseId === parseInt(courseId));
    const index = course.findIndex((item) => item.id === parseInt(sumId));
    const summary = course.filter((item) => item.id === parseInt(sumId));

    const prevIndex = index - 1;
    const nextIndex = index + 1;

    const prevdata = prevIndex >= 0 ? course[prevIndex].id : false;
    const nextdata = nextIndex < course.length ? course[nextIndex].id : false;

    const isFirstCourse = index === 0;
    const isLastCourse = index === course.length - 1;



    return (

        <div className="px-[1rem] sm:px-[7rem] lg:px-[10rem] ">

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
