// // app/api/user/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/User";

// export async function POST(request: NextRequest) {
//   try {
//     const { name, email } = await request.json();
//     await connectMongoDB();

//     await User.create({ name, email });

//     return NextResponse.json({ message: "User Registered" }, { status: 201 });
//   } catch (error) {
//     console.error("User creation error:", error);
//     return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
//   }
// }

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const { name, email } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("🟡 User already exists:", email);
      return new Response("User already exists", { status: 200 });
    }

    const newUser = await User.create({ name, email });
    console.log("🟢 New user saved:", newUser);

    return new Response("User created", { status: 201 });
  } catch (err) {
    console.error("🔴 Error saving user:", err);
    return new Response("Error creating user", { status: 500 });
  }
}