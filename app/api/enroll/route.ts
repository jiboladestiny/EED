import { connect } from "@/dbConfig/dbConfig";
import Enrolled from '../../models/enrolledModel'
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userId, courseId } = reqBody;


        // check if user exist
        const course = await Enrolled.findOne({ courseId })

        if (course) {
            return NextResponse.json({
                error: "Course already exist"
            }, { status: 400 })
        }

        const enrolledCourse = new Enrolled({
            courseId,
            userId
        });

        const savedCourse = await enrolledCourse.save();

        return NextResponse.json({
            message: "Course Enrolled successfully",
            success: true,
            enrolledCourse
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}



export async function GET() {
    try {
        const course = await Enrolled.find()

        return NextResponse.json({
            message: "Enrolled fetched succesfully",
            success: true,
            data: course

        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }

}





