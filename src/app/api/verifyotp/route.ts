import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/user.model";
import dbConnect from "@/util/dbConnect";

export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const { username, code } = await req.json();

        const user = await UserModel.findOne({ username });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }

        const isCodeCorrect = code == user.verifyCode;
        const isNotExpired = new Date(user.codeExpiry) > new Date();

        if (isCodeCorrect && isNotExpired) {
            user.isVerified = true;
            await user.save();
            return NextResponse.json({
                success: true,
                message: "User verified successfully"
            }, { status: 200 })
        }

        else if (!isNotExpired) {
            return NextResponse.json({
                success: false,
                message: "Verify code expired"
            }, { status: 400 })
        }

        else {
            return NextResponse.json({
                success: false,
                message: "Invalid verify code"
            }, { status: 400 })
        }

    } catch (error) {
        console.error("Error in verifying code ",error)
        return NextResponse.json({
            success: false,
            message: "Unexpected error occured"
        }, { status: 500 })
    }
}