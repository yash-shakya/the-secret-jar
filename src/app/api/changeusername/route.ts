import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/user.model";
import { getServerSession } from "next-auth";
import dbConnect from "@/util/dbConnect";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);
        const username = session?.user?.username;
        const { newUsername } = await request.json();

        if(!username) {
            return NextResponse.json(
                { success:false, error: "User not authenticated." },
                { status: 401 }
            );
        }

        // Validate input
        if (!newUsername) {
            return NextResponse.json(
                { error: "New username are required." },
                { status: 400 }
            );
        }

        // Check if the new username is already taken
        const existingUser = await UserModel.findOne({ username: newUsername, isVerified:true });
        if (existingUser) {
            return NextResponse.json(
                { error: "Username already exists." },
                { status: 409 }
            );
        }

        // Update the username in the database
        const updatedUser = await UserModel.findOneAndUpdate(
            {username},
            { username: newUsername },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json(
                { error: "User not found or update failed." },
                { status: 404 }
            );
        }

        return NextResponse.json({success:true, message: "Username updated successfully." });
    } catch (error) {
        console.error("Error updating username:", error);
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }
}