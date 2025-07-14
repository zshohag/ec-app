// src/app/api/payments/stripe/route.ts
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { amount, email } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: 'Order Payment' },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXTAUTH_URL}/checkout/success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
    customer_email: email,
  });

  return NextResponse.json({ id: session.id });
}

