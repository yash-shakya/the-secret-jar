import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/user.model";
import dbConnect from "@/util/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);
        const username = session?.user.username;
        const { messageId } = await request.json();

        if (!messageId) {
            return NextResponse.json(
                { success: false, error: "Invalid input" },
                { status: 400 }
            );
        }

        const user = await UserModel.findOneAndUpdate(
            { username, "messages._id": messageId },
            { $set: { "messages.$.isOpened": true } },
            { new: true }
        );

        if (!user) {
            return NextResponse.json(
                { success: false, error: "User or message not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: "Message opened successfully" });
    } catch (error) {
        console.error("Error in changeopen route:", error);
        return NextResponse.json(
            { message: "Internal server error", success: false, error: error },
            { status: 500 }
        );
    }
}