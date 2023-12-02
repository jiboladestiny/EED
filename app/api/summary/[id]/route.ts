import { connect } from "@/dbConfig/dbConfig";
import Summary from '../../../models/summaryModel'
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
        const summary = await Summary.findOne({ _id: id });

        return NextResponse.json({
            message: "Summary fetched succesfully",
            success: true,
            user: summary
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }

}



export async function DELETE(request: NextRequest, { params: { id } }: Params) {
    try {

        const summary = await Summary.findById({ _id: id });

        if (!summary) {
            return NextResponse.json({
                message: "Content not found",
            }, { status: 404 });
        }

            const imgId = summary.publicId

            const deletevedio = await cloudinary.uploader.destroy(imgId,{
            resource_type: 'video' 
           });

            await Summary.findByIdAndDelete({ _id: id });


        return NextResponse.json({
            message: "Content deleted successfully",
            success: deletevedio
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}