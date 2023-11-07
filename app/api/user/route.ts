import { connect } from "@/dbConfig/dbConfig";
import User from '../../models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { name, email, isAdmin } = reqBody
        console.log(reqBody)


        const user = await User.findOne({ email })

        // checking user
        if (user) {
            return NextResponse.json({
                message: "User already exist"
            }, { status: 400 })
        }



        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash("12345678", salt)

        const newUser = new User({
            name,
            email,
            isAdmin,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        return NextResponse.json({
            message: "User registered succesfully",
            success: true,
            savedUser
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }

}


export async function GET() {
    try {
        const user = await User.find()

        return NextResponse.json({
            message: "User Found succesfully",
            success: true,
            data: user

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
        const { _id, name, isAdmin } = reqBody;

        // Check if the user with the given ID exists
        const user = await User.findById(_id);

        if (!user) {
            return NextResponse.json({
                message: "User not found",
            }, { status: 404 });
        }

        // Update user information without changing the password
        user.name = name || user.name;
        user.isAdmin = isAdmin || user.isAdmin;

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


export async function DELETE(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id } = reqBody;

        // Check if the user with the given ID exists
        const user = await User.findById({ _id: id });

        if (!user) {
            return NextResponse.json({
                message: "User not found",
            }, { status: 404 });
        }

        await User.findByIdAndDelete({ _id: id });


        return NextResponse.json({
            message: "User deleted successfully",
            success: true
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}
