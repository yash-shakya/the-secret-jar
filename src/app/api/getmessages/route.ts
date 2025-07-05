import { NextResponse } from "next/server";
import UserModel from "@/model/user.model";
import dbConnect from "@/util/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET() {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);
        const username = session?.user.username;

        if (!username) {
            return NextResponse.json(
                { success: false, error: "Username is required" },
                { status: 400 }
            );
        }

        const user = await UserModel.aggregate([
            { $match: { username } },
            { $unwind: '$messages' },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } },
        ]).exec();

        if (!user || user.length === 0) {
            return NextResponse.json(
                { message: 'User not found', success: false },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, messages: user[0].messages },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error('An unexpected error occurred:', error);
        return Response.json(
            { message: 'Internal server error', success: false },
            { status: 500 }
        );
    }
}