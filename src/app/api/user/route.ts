// app/api/user/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();
    await connectMongoDB();

    await User.create({ name, email });

    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
