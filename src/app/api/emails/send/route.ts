// src/app/api/emails/send/route.ts
import { sendMail } from '@/lib/email';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { to, subject, html } = await req.json();
  await sendMail(to, subject, html);
  return NextResponse.json({ message: 'Email sent' });
}
