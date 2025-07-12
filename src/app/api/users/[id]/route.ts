// src/app/api/users/[id]/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import {User} from '@/models/User';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const user = await User.findById(params.id);
  return NextResponse.json(user);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();
  const updatedUser = await User.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updatedUser);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await User.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'User deleted' });
}
