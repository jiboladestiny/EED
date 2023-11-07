import { connect } from "@/dbConfig/dbConfig";
import Summary from '../../models/summaryModel'
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { courseId, outline, vedio, description } = reqBody


        const newSummary = new Summary({
           courseId,
           outline,
           vedio,
           description
        })

        const savedSummary = await newSummary.save()
        // console.log(savedsummary)

        return NextResponse.json({
            message: "Summary added succesfully",
            success: true,
            newSummary

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
        const { _id, courseId, outline, vedio, description } = reqBody;

        // Check if the summary with the given ID exists
        const summary = await Summary.findById(_id);

        if (!summary) {
            return NextResponse.json({
                message: "Summary not found",
            }, { status: 404 });
        }

        // Update summary information without changing the password
        summary.courseId = courseId || summary.courseId;
        summary.outline = outline || summary.outline;
        summary.vedio = vedio || summary.vedio;
        summary.description = description || summary.description;


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


export async function DELETE(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id } = reqBody;

        // Check if the summary with the given ID exists
        const course = await Summary.findById({ _id: id });

        if (!course) {
            return NextResponse.json({
                message: "No summary found",
            }, { status: 404 });
        }

        await Summary.findByIdAndDelete({ _id: id });


        return NextResponse.json({
            message: "Course summary deleted successfully",
            success: true
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}
