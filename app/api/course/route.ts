import { connect } from "@/dbConfig/dbConfig";
import Course from '../../models/courseModel'
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userId, title, image, instructor, description } = reqBody;

        // Check if userId is provided
        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 } // Bad Request
            );
        }

        const newCourse = new Course({
            userId,
            title,
            image,
            instructor,
            description
        });

        const savedCourse = await newCourse.save();

        return NextResponse.json({
            message: "Course added successfully",
            success: true,
            savedCourse
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}



export async function GET() {
    try {
        const course = await Course.find()

        return NextResponse.json({
            message: "Courses fetch succesfully",
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
        const { _id, userId, title, image, instructor, description } = reqBody;

        // Check if the user with the given ID exists
        const user = await Course.findById( _id);

        if (!user) {
            return NextResponse.json({
                message: "User not found",
            }, { status: 404 });
        }

        // Update user information without changing the password
        user.userId = userId || user.userId;
        user.title = title || user.title;
        user.image = image || user.image;
        user.instructor = instructor || user.instructor;
        user.description = description || user.description;
        

        const updatedUser = await user.save();

        return NextResponse.json({
            message: "User information updated successfully",
            success: true,
            updatedUser
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}



