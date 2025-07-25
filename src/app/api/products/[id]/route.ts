// src/app/api/products/[id]/route.ts
import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";


export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("Received ID:", id);

    await connectMongoDB();
    console.log("✅ Connected to MongoDB");

    // Since your model uses a custom 'id' field (not _id), search by that field
    const product = await Product.findOne({ id: id });
    console.log("Product found:", !!product);

    if (!product) {
      console.log("Product not found for ID:", id);
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    console.log("✅ Returning product:", product.name);
    return NextResponse.json(product);
  } catch (err) {
    console.error("API Route Error:", err);
    return NextResponse.json(
      {
        message: "Error fetching product",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    await connectMongoDB();

    const updatedProduct = await Product.findOneAndUpdate({ id: id }, body, {
      new: true,
    });

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProduct);
  } catch (err) {
    console.error("PUT Error:", err);
    return NextResponse.json(
      {
        message: "Error updating product",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectMongoDB();

    const deletedProduct = await Product.findOneAndDelete({ id: id });

    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json(
      {
        message: "Error deleting product",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
