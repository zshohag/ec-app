// src/app/api/reviews/route.ts
import { connectDB } from '@/lib/connectDB';
import { NextResponse } from 'next/server';
import {Review} from '@/models/Review';

export async function GET() {
  await connectDB();
  const reviews = await Review.find();
  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const review = await Review.create(body);
  return NextResponse.json(review, { status: 201 });
}