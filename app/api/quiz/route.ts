import { connect } from "@/dbConfig/dbConfig";
import Quiz from '../../models/quizModel'
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { courseId, question, options, correctAnswer } = reqBody


        const newQuiz = new Quiz({
            courseId,
            question,
            options,
            correctAnswer
        })

        const savedQuiz = await newQuiz.save()

        return NextResponse.json({
            message: "Question added succesfully",
            success: true,
            savedQuiz

        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }

}


export async function GET() {
    try {
        const quiz = await Quiz.find()

        return NextResponse.json({
            message: "Summary fetch succesfully",
            success: true,
            data: quiz

        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }

}


export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { _id, courseId, question, options, correctAnswer } = reqBody;

        // Check if the summary with the given ID exists
        const quiz = await Quiz.findById(_id);

        if (!quiz) {
            return NextResponse.json({
                message: "Summary not found",
            }, { status: 404 });
        }

        // Update summary information without changing the password
        quiz.courseId = courseId || quiz.courseId;
        quiz.question = question || quiz.question;
        quiz.options = options || quiz.options;
        quiz.correctAnswer = correctAnswer || quiz.correctAnswer;


        const updatedQuiz = await quiz.save();

        return NextResponse.json({
            message: "Summary updated successfully",
            success: true,
            updatedQuiz
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}


