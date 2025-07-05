import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/user.model";
import dbConnect from "@/util/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { Types } from "mongoose";

export async function DELETE(request: NextRequest) {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);
        const _user = session?.user;
        const { searchParams } = new URL(request.url);
        const messageId = searchParams.get("messageId");
        
        if (!messageId) {
            return NextResponse.json({ success: false, error: "Message ID is required" }, { status: 400 });
        }

        if (!session || !_user) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        // Validate messageId format
        if (!Types.ObjectId.isValid(messageId)) {
            return NextResponse.json({ success: false, error: "Invalid message ID format" }, { status: 400 });
        }

        // Check if user ID exists and is valid
        if (!_user._id) {
            return NextResponse.json({ success: false, error: "User ID not found in session" }, { status: 400 });
        }

        // Since _id comes as string from NextAuth, validate it as ObjectId
        if (!Types.ObjectId.isValid(_user._id)) {
            return NextResponse.json({ success: false, error: "Invalid user ID format" }, { status: 400 });
        }

        const updateResult = await UserModel.updateOne(
            { _id: new Types.ObjectId(_user._id) },
            { $pull: { messages: { _id: new Types.ObjectId(messageId) } } }
        );

        if (updateResult.modifiedCount === 0) {
            return NextResponse.json(
                { message: 'Message not found or already deleted', success: false },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Message deleted', success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting message:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}