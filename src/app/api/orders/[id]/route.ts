// src/app/api/orders/[id]/route.ts
import { connectDB } from '@/lib/connectDB';
import { NextResponse } from 'next/server';
import {Order} from '@/models/Order';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();
  const updated = await Order.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Order.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Order deleted' });
}
