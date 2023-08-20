'use client'
import React, { useState } from 'react'
import Quiz from "../../datas/Quiz"
import Button from '@/app/component/Button'

interface Params {
    params: {
        courseId: string
    }
}

interface QuizQuestion {
    id: number;
    courseId: number;
    question: string;
    options: string[];
    correctAnswer: string;
}
const Page = ({ params: { courseId } }: Params) => {
    const quiz: QuizQuestion[] = Quiz.filter((item) => item.courseId === parseInt(courseId));
    const [activeQuestion, setActiveQuestion] = useState<number>(0)
    const [selectedAnswer, setSelectedAnswer] = useState<boolean>()
    const [checked, setChecked] = useState<boolean>(false)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | string | null>();
    const [showResult, setShowResult] = useState(false)
    const [result, setResult] = useState<{
        score: number;
        correctAnswers: number;
        wrongAnswers: number;
    }>({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0
    })

    const { question, options, correctAnswer } = quiz[activeQuestion]
    const onAnswerSelected = (option: string, idx: number | string) => {
        setChecked(true)
        setSelectedAnswerIndex(idx)

        if (option === correctAnswer) {
            setSelectedAnswer(true)
            console.log("true")
        } else {
            setSelectedAnswer(false)
            console.log("false")
        }
    }

    // calculate score and increment to the next question
    const nextQuestion = () => {
        setSelectedAnswerIndex(null)
        setResult((prev) => selectedAnswer ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1
        } : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1
        })
        console.log(result)

        if (activeQuestion !== quiz.length - 1) {

            setActiveQuestion((prev) => prev + 1)

        } else {
            setActiveQuestion(0)
            setShowResult(true)
        }
    }
    return (

        <div className="px-[1rem] sm:px-[7rem] lg:px-[10rem] min-h-[65vh]">

            <h2 className="mt-10 mb-4 sm:text-[34px] text-[28px] font-bold leading-8 ">Assestments</h2>


            {!showResult ? (<div>
                <h2 className="mt-2 mb-4 text-gray-500 sm:text-[21px] italic text-[18px] font-bold leading-8">Question {activeQuestion + 1}/{quiz.length}...</h2>

                <h2 className="mt-2 mb-4 sm:text-[21px] italic text-[18px] font-bold leading-8">{question}</h2>

                <ul className='quiz'>{options.map((option, idx) => (
                    <li key={idx}
                        onClick={

                            () => onAnswerSelected(option, idx)
                        }
                        className={`${selectedAnswerIndex === idx ? "li-selected" : "li-hover"}`}><span>{option}</span></li>
                ))}</ul>

                <div className="flex justify-between mt-12">
                    <div></div>
                    <div><Button onClick={nextQuestion} disabled={checked}>{activeQuestion === quiz.length - 1 ? "Submit" : "Next"}</Button></div>
                </div>

            </div>) : (<div>
                <h2 className="mt-2 mb-4 text-gray-500 sm:text-[21px] italic text-[18px] font-bold leading-8">Result</h2>
                    <ul className='quiz'>
                    <li>
                        Overall: {(result.score / 25) * 100}%
                    </li>
                    <li>Correct Answers: <span className='font-bold'>{result.correctAnswers}</span></li>
                    <li>Wrong Answers: <span className="font-bold">{result.wrongAnswers}</span></li>
                </ul>

                <Button disabled={true} onClick={
                    () =>{
                        setShowResult(false)
                        setResult({
                            score: 0,
                            correctAnswers: 0,
                            wrongAnswers: 0
                        })
                    }
                }>Retake</Button>
            </div>)}

        </div>
    )
}

export default Page
