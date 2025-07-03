import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/user.model";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');
    console.log("Checking acceptance for username:", username);

    if (!username) {
        return NextResponse.json({ success: false, message: "Username is required" }, { status: 400 });
    }

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        const message = user.isAcceptingMessage ? "User is accepting messages" : "User is not accepting messages";

        return NextResponse.json({ success:true, isAccepting: user.isAcceptingMessage, message:message }, { status: 200 });
    } catch (error) {
        console.error('Error checking acceptance:', error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}