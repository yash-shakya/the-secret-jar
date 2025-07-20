import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/user.model";
import dbConnect from "@/util/dbConnect";
import bcrypt from "bcryptjs";
import { sendotp } from "@/util/sendotp";

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const { username, name, email, password } = await req.json();

        const user = await UserModel.findOne({
            $or: [
                { email },
                { username }
            ]
        });

        const hashedPass = (await bcrypt.hash(password, 10));
        const verifyCode = Math.floor(10000 + Math.random() * 900000).toString();
        const codeExpiry = new Date()
        codeExpiry.setHours(codeExpiry.getHours() + 1);

        if (!user) {
            await UserModel.create({
                email,
                name,
                username,
                password: hashedPass,
                verifyCode,
                codeExpiry
            })

            try {
                const otpres = await sendotp(email, username, verifyCode);
                console.log(otpres);
            } catch (otpError) {
                console.error("Failed to send OTP:", otpError);
            }

            return NextResponse.json({
                success: true,
                message: "User Created successfully"
            }, { status: 201 })
        }

        if (user.isVerified) return NextResponse.json({
            success: false,
            message: user.username == username ? "User already found with this username" : "User already found with this email"
        }, { status: 409 })

        user.username = username;
        user.name = name;
        user.email = email;
        user.password = hashedPass;
        user.verifyCode = verifyCode;
        user.codeExpiry = codeExpiry;

        await user.save();

        try {
            const otpres = await sendotp(email, username, verifyCode);
            console.log(otpres);
        } catch (otpError) {
            console.error("Failed to send OTP:", otpError);
        }

        return NextResponse.json({
            success: true,
            message: "User Created successfully"
        }, { status: 200 })


    } catch (error: unknown) {
        
        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json({
                success: false,
                message: "Invalid input data",
            }, { status: 400 });
        }

        console.error(`Error in creating user ${error}`)
        return NextResponse.json({
            success: false,
            message: `Error in creating user`
        }, { status: 500 })
    }
}
