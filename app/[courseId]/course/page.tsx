'use client'
import Section from '@/app/component/Section'
import Summary from '@/app/datas/Summary'
import React from 'react'

type Params = {
    params: {
        courseId: string
    }
}

const page = ({ params: { courseId } }: Params) => {

    const summary = Summary.filter((item) => item.courseId === parseInt(courseId));



    return (
        <div className="px-[1rem] sm:px-[7rem] lg:px-[10rem] ">
            <Section summary={summary} />

        </div>

    )
}

export default page
