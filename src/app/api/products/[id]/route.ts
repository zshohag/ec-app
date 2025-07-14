// src/app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import {Product} from '@/models/Product';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const product = await Product.findById(params.id);
  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();
  const updatedProduct = await Product.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updatedProduct);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Product deleted' });
}
