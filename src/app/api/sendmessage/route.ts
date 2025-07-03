import { NextRequest, NextResponse } from "next/server";
import UserModel, { Message } from "@/model/user.model";
import dbConnect from "@/util/dbConnect";

export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const { username, content } = await req.json();
        const user = await UserModel.findOne({ username })
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 400 })
        }

        if (!user.isAcceptingMessage) {
            return NextResponse.json({ success: false, message: "User not accepting message" }, { status: 400 })
        }

        const message = { content, createdAt: new Date() };

        user.messages.push(message as Message)
        await user.save()

        return NextResponse.json(
            { message: 'Message sent successfully', success: true },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error adding message:', error);
        return NextResponse.json(
            { message: 'Internal server error', success: false },
            { status: 500 }
        );
    }
}