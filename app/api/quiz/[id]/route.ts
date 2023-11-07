import { connect } from "@/dbConfig/dbConfig";
import Quiz from '../../../models/quizModel'
import { NextRequest, NextResponse } from "next/server";


connect()

type Params = {
    params: {
        id: string
    }
}

export async function GET(request: NextRequest, { params: { id } }: Params) {
    try {
        // const reqBody = await request.json()
        // const { query: { id } } = reqBody


        const quiz = await Quiz.findOne({ _id: id });



        return NextResponse.json({
            message: "Questions fetched succesfully",
            success: true,
            user: quiz
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }

}

export async function DELETE(request: NextRequest, { params: { id } }: Params) {
    try {


        const user = await Quiz.findById({ _id: id });

        if (!user) {
            return NextResponse.json({
                message: "Question not found",
            }, { status: 404 });
        }

        await Quiz.findByIdAndDelete({ _id: id });


        return NextResponse.json({
            message: "Question added successfully",
            success: id
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}