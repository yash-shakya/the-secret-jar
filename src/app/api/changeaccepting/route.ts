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
        const { accept } = await request.json();

        if (!username) {
            return NextResponse.json(
                { success:false, error: "Invalid input" },
                { status: 400 }
            );
        }

        const user = await UserModel.findOneAndUpdate({
            username
        }, {
            isAcceptingMessage: accept
        }, {
            new: true
        });
        if (!user) {
            return NextResponse.json(
                { success:false, error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: "User message acceptance status updated successfully" });
    } catch (error) {
        console.error("Error in changeaccepting route:", error);
        return NextResponse.json(
            { message: "Internal server error", success: false, error: error },
            { status: 500 }
        );
    }
}

export async function GET() {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions)
        const username = session?.user.username;

        if (!username) {
            return NextResponse.json(
                { success:false, error: "Username is required" },
                { status: 400 }
            );
        }

        const user = await UserModel.findOne({ username });

        if (!user) {
            return NextResponse.json(
                { success:false, error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success:true, isAccepting: user.isAcceptingMessage });
    } catch (error) {
        console.error("Error in changeaccepting route:", error);
        return NextResponse.json(
            { message: "Internal server error", success: false, error: error },
            { status: 500 }
        );
    }
}