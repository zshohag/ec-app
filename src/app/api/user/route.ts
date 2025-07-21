
// // app/api/user/route.ts
// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/User";

// export async function POST(req: Request) {
//   try {
//     await connectMongoDB();
//     const { name, email, role = "user" } = await req.json();

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       console.log("🟡 User already exists:", email);
//       return new Response("User already exists", { status: 200 });
//     }

//     const newUser = await User.create({ name, email, role });
//     console.log("🟢 New user saved:", newUser);

//     return new Response("User created", { status: 201 });
//   } catch (err) {
//     console.error("🔴 Error saving user:", err);
//     return new Response("Error creating user", { status: 500 });
//   }
// }


//////////

// app/api/user/route.ts
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const { name, email, password, role = "user" } = await req.json();

    if (!name || !email || !password) {
      return new Response("Missing fields", { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("🟡 User already exists:", email);
      return new Response("User already exists", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    console.log("🟢 New user created:", newUser);
    return new Response("User created", { status: 201 });
  } catch (err) {
    console.error("🔴 Error saving user:", err);
    return new Response("Error creating user", { status: 500 });
  }
}
