import React, { useState } from 'react'
import Button from './Button'
import Vedio from './Vedio'

interface summary {
    id: number,
    courseId: number,
    outline: string,
    vedio: string
    description: string
}
interface sectionProp {
    summary: summary[]
}

const Section = ({ summary }: sectionProp) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);


    const handlePrevClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (currentIndex < summary.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const current = summary[currentIndex];
    return (
        <div>
            <h2 className="mt-10 mb-4 text-[30px] font-bold">{current.outline}</h2>

             <p className='mb-[3rem]'>{current.description}</p>

            <div className='lg:px-[10rem]'>
                <Vedio videoUrl={current.vedio} />
            </div>


            <div className='flex justify-between mt-8'>
                <Button disabled={currentIndex === 0} onClick={handlePrevClick}>Prev</Button>
                <Button disabled={currentIndex === summary.length - 1}   onClick={handleNextClick}>Next</Button>
            </div>
        </div>
    )
}

export default Section
