// src/app/api/payments/paypal/route.ts
import { getPayPalClient } from '@/lib/paypal';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { amount } = await req.json();
  const { clientId, clientSecret, base } = getPayPalClient();

  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const { access_token } = await response.json();

  const orderRes = await fetch(`${base}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: { currency_code: 'USD', value: amount },
        },
      ],
    }),
  });

  const order = await orderRes.json();
  return NextResponse.json(order);
}