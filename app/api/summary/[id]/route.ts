import { connect } from "@/dbConfig/dbConfig";
import Summary from '../../../models/summaryModel'
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


        const user = await Summary.findById({ _id: id });

        if (!user) {
            return NextResponse.json({
                message: "Content not found",
            }, { status: 404 });
        }

        await Summary.findByIdAndDelete({ _id: id });


        return NextResponse.json({
            message: "Content deleted successfully",
            success: id
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}