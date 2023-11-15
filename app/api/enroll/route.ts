import { connect } from "@/dbConfig/dbConfig";
import Enrolled from '../../models/enrolledModel'
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userId, courseId } = reqBody;

        // Check if user is already enrolled in the course
        const existingEnrollment = await Enrolled.findOne({ userId, courseId });

        if (existingEnrollment) {
            return NextResponse.json({
                error: "User is already enrolled in this course",
            }, { status: 400 });
        }

        // If not enrolled, create a new enrollment
        const enrolledCourse = new Enrolled({
            courseId,
            userId,
        });

        const savedCourse = await enrolledCourse.save();

        return NextResponse.json({
            message: "Course enrolled successfully",
            success: true,
            savedCourse,
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
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


export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { _id, isStarted } = reqBody;

        // Check if the user with the given ID exists
        const enroll = await Enrolled.findById(_id);

        if (!enroll) {
            return NextResponse.json({
                message: "Id not found",
            }, { status: 404 });
        }

        // Update user information without changing the password
        enroll.isStarted = isStarted || enroll.isStarted;



        const updatedUser = await enroll.save();

        return NextResponse.json({
            message: "Course has started",
            success: true,
            updatedUser
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}





