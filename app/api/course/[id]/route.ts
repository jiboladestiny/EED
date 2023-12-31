import { connect } from "@/dbConfig/dbConfig";
import Course from '../../../models/courseModel'
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "../../util/cloudinary";


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


        const course = await Course.findOne({ _id: id });



        return NextResponse.json({
            message: "Course fetched succesfully",
            success: true,
            user: course
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }

}


export async function DELETE(request: NextRequest, { params: { id } }: Params) {
    try {
        const user = await Course.findById({ _id: id });
        if (!user) {
            return NextResponse.json({
                message: "Course not found",
            }, { status: 404 });
        }
        const imgId = user.publicId
        //modify the image conditionally
        if (imgId) {
            await cloudinary.uploader.destroy(imgId);
        }
        await Course.findByIdAndDelete({ _id: id });
        return NextResponse.json({
            message: "Course deleted successfully",
            success: id
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}
