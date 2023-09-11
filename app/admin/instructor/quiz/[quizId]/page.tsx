import QuizWrapper from '@/app/component/QuizWrapper'
import Quiz from '@/app/datas/Quiz'
import React from 'react'


type Params = {
    params: {
        quizId: string,
    }
}


const page = ({ params: { quizId } }: Params) => {
    const data = Quiz.filter((item) => item.courseId === parseInt(quizId));

    return (
        <div className="px-[1rem] sm:px-[7rem] lg:px-[10rem] min-h-[67vh]">
            <h2 className="mt-10 mb-4 sm:text-[30px] text-[24px] font-bold leading-8">Instructor Dashboard</h2>
            <h2 className="mt-2 mb-4 text-gray-500 sm:text-[21px] text-[18px] font-bold leading-8">Quiz</h2>
            <QuizWrapper quiz={data} course={parseInt(quizId)} />
        </div>
    )
}

export default page
