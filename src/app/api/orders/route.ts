// src/app/api/orders/route.ts
import { connectDB } from '@/lib/connectDB';
import { NextResponse } from 'next/server';
import {Order} from '@/models/Order';

export async function GET(req: Request) {
  await connectDB();
  const email = new URL(req.url).searchParams.get('email');
  const orders = await Order.find(email ? { email } : {});
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const order = await Order.create(data);
  return NextResponse.json(order, { status: 201 });
}