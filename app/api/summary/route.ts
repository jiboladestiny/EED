import { connect } from "@/dbConfig/dbConfig";
import Summary from '../../models/summaryModel'
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "../util/cloudinary";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { courseId, outline, url, publicId, description } = reqBody


        // const result = await cloudinary.uploader.upload(asset, {
        //     resource_type: 'video',
        //     folder: 'videos'
        // });

        // if (result.error) {
        //     return NextResponse.json(
        //         { error: `Error uploading image to Cloudinary:${result.error.message}` },
        //         { status: 500 }
        //     );
        // }


        const newSummary = new Summary({
            courseId,
            outline,
            publicId: publicId,
            url: url,
            description
        })

        const savedSummary = await newSummary.save()
        // console.log(savedsummary)

        return NextResponse.json({
            message: "Summary added succesfully",
            success: true,
            savedSummary

        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }

}


export async function GET() {
    try {
        const summmary = await Summary.find()

        return NextResponse.json({
            message: "Summary fetch succesfully",
            success: true,
            data: summmary

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
        const { _id, courseId, outline, url, publicId, description } = reqBody;

        // Check if the summary with the given ID exists
        const summary = await Summary.findById(_id);




        if (!summary) {
            return NextResponse.json({
                message: "Summary not found",
            }, { status: 404 });
        }


        const imgId = summary.publicId

        if (imgId) {
            const deletevedio = await cloudinary.uploader.destroy(imgId, {
                resource_type: 'video'
            });

        }




        summary.courseId = courseId || summary.courseId;
        summary.outline = outline || summary.outline;
        summary.description = description || summary.description;
        summary.url = url || summary.secure_url
        summary.publicId = publicId || summary.publicId


        const updatedSummary = await summary.save();

        return NextResponse.json({
            message: "Summary updated successfully",
            success: true,
            updatedSummary

        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}

