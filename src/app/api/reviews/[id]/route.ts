// src/app/api/reviews/[id]/route.ts
import { connectDB } from '@/lib/connectDB';
import { NextResponse } from 'next/server';
import {Review} from '@/models/Review';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const updated = await Review.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Review.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Review deleted' });
}