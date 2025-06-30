import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/user.model";
import dbConnect from "@/util/dbConnect";

export async function GET(req: NextRequest) {
    await dbConnect();

    try {
        const { searchParams } = new URL(req.url)
        const username = searchParams.get('username');

        if (username === "") return NextResponse.json({
            success: false,
            message: "Username cannot be empty"
        },{status:400})

        const user = await UserModel.findOne({ username, isVerified: true })

        if (!user) {
            return NextResponse.json({
                success: true,
                message: "Username is unique"
            }, { status: 200 })
        }
        else {
            return NextResponse.json({
                success: false,
                message: "Username already taken"
            }, { status: 200 })
        }


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Unexpected error occurred"
        }, { status: 500 })
    }

}