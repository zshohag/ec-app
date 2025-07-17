import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { products } from "@/data/products";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    await Product.deleteMany(); // clear old
    await Product.insertMany(products);
    return NextResponse.json({ message: "✅ Products seeded!" });
  } catch (error) {
    console.error("❌ Seeding error:", error);
    return NextResponse.json({ error: "Failed to seed" }, { status: 500 });
  }
}
