import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/user.model";
import dbConnect from "@/util/dbConnect";

export async function GET(req: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');

    if (!username) {
        return NextResponse.json({ success: false, message: "Username is required" }, { status: 400 });
    }

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        const message = user.isAcceptingMessage ? "User is accepting messages" : "User is not accepting messages";

        return NextResponse.json({ success:true, isAccepting: user.isAcceptingMessage, message:message, name:user.name }, { status: 200 });
    } catch (error) {
        console.error('Error checking acceptance:', error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}