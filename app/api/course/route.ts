import { connect } from "@/dbConfig/dbConfig";
import Course from '../../models/courseModel'
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "../util/cloudinary";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userId, title, image, instructor, description } = reqBody;

        const result = await cloudinary.uploader.upload(image, {
            folder: "upload",
            // width: 300,
            crop: "scale"
        });

        if (result.error) {
            return NextResponse.json(
                { error: `Error uploading image to Cloudinary:${result.error.message}` },
                { status: 500 }
            );
        }


        const newCourse = new Course({
            userId,
            title,
            publicId: result.public_id,
            url: result.secure_url,
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
        const user = await Course.findById(_id);

        if (!user) {
            return NextResponse.json({
                message: "User not found",
            }, { status: 404 });
        }

        // Update user information without changing the password
        user.userId = userId || user.userId;
        user.title = title || user.title;
        user.instructor = instructor || user.instructor;
        user.description = description || user.description;
        const imgId = user.publicId

        //modify the image conditionally
        if (image !== "") {
            if (imgId) {
                await cloudinary.uploader.destroy(imgId);
            }


            const newimg = await cloudinary.uploader.upload(image, {
                folder: "upload",
                // width: 300,
                // crop: "scale"
            });

            if (newimg.error) {
                return NextResponse.json(
                    { error: `Error uploading image to Cloudinary:${newimg.error.message}` },
                    { status: 500 }
                );
            }

            user.url = newimg.secure_url
            user.publicId = newimg.public_id

        }
        const updatedUser = await user.save();

        return NextResponse.json({
            message: "User information updated successfully",
            success: true,
            imageid: updatedUser
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}



