import { connect } from "@/dbConfig/dbConfig";
import Enrolled from "@/app/models/enrolledModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { _id, isStarted} = reqBody;

        // Check if the user with the given ID exists
        const user = await Enrolled.findById(_id);

        if (!user) {
            return NextResponse.json({
                message: "Id not found",
            }, { status: 404 });
        }

        // Update user information without changing the password
        user.userId = isStarted || user.userId;



        const updatedUser = await user.save();

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



