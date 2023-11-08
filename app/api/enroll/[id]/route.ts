import { connect } from "@/dbConfig/dbConfig";
import Enrolled from '../../../models/enrolledModel'
import { NextRequest, NextResponse } from "next/server";


connect()

type Params = {
    params: {
        id: string
    }
}

// export async function GET(request: NextRequest, { params: { id } }: Params) {
//     try {
//         // const reqBody = await request.json()
//         // const { query: { id } } = reqBody


//         const course = await Course.findOne({ _id: id });



//         return NextResponse.json({
//             message: "Course fetched succesfully",
//             success: true,
//             user: course
//         })
//     } catch (error: any) {
//         return NextResponse.json({
//             error: error.message
//         }, { status: 500 })
//     }

// }


export async function DELETE(request: NextRequest, { params: { id } }: Params) {
    try {


        const user = await Enrolled.findById({ _id: id });

        if (!user) {
            return NextResponse.json({
                message: "Enrolles course not found",
            }, { status: 404 });
        }

        await Enrolled.findByIdAndDelete({ _id: id });


        return NextResponse.json({
            message: "Enrolled course deleted successfully",
            success: id
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}
