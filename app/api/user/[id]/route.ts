import { connect } from "@/dbConfig/dbConfig";
import User from '../../../models/userModel'
import { NextRequest, NextResponse } from "next/server";


connect()

type Params = {
    params: {
        id: string
    }
}

export async function GET(request: NextRequest, { params: { id } }: Params) {
    try {
        const user = await User.findOne({ _id: id });
        return NextResponse.json({
            message: "User get succesfully",
            success: true,
            user: user
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params: { id } }: Params) {
    try {


        const user = await User.findById({ _id: id });

        if (!user) {
            return NextResponse.json({
                message: "User not found",
            }, { status: 404 });
        } 

        await User.findByIdAndDelete({ _id: id });


        return NextResponse.json({
            message: "User deleted successfully",
            success: id
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}
