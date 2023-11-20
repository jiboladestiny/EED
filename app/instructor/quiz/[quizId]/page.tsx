import QuizWrapper from '@/app/component/QuizWrapper'
import Quiz from '@/app/datas/Quiz'
import quizData from '@/helpers/getAllQuiz'
import { Suspense } from 'react'

type Params = {
    params: {
        quizId: string,
    }
}


const page = async ({ params: { quizId } }: Params) => {
    const quiz = await quizData();
    const data = quiz.data.filter((item: any) => item.courseId === quizId);

    return (
        <div className="px-[1rem] sm:px-[7rem] lg:px-[10rem] min-h-[67vh]">
            <h2 className="mt-10 mb-4 sm:text-[30px] text-[24px] font-bold leading-8">Instructor Dashboard</h2>
            <h2 className="mt-2 mb-4 text-gray-500 sm:text-[21px] text-[18px] font-bold leading-8">Quiz</h2>      
            <Suspense fallback={<p>Quetions loading</p>}>
                <QuizWrapper quiz={data} course={quizId} />
            </Suspense>  

             </div>
    )
}

export default page
