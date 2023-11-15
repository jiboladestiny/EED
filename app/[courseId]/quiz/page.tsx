
import quizData from '@/helpers/getAllQuiz'
import AssestmentWrapper from '@/app/component/AssestmentWrapper'

interface Params {
    params: {
        courseId: string
    }
}

interface QuizQuestion {
    _id: number;
    courseId: number;
    question: string;
    options: string[];
    correctAnswer: string;
}



const Page = async ({ params: { courseId } }: Params) => {
    const quizdata = await quizData()
    const quiz: QuizQuestion[] = quizdata.data.filter((item:any )=> item.courseId === courseId);
  
    return (

        <div className="px-[1rem] sm:px-[7rem] lg:px-[10rem] min-h-[67vh]">

            <h2 className="mt-10 mb-4 sm:text-[34px] text-[28px] font-bold leading-8 ">Assestments</h2>

<AssestmentWrapper quiz={quiz} />
    

        </div>
    )
}

export default Page
