// /app/api/orders/admin/route.ts
import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const GET = async () => {
  await connectMongoDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const orders = await Order.find().sort({ createdAt: -1 });
  return NextResponse.json(orders);
};
