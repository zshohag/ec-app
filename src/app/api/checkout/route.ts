// // /api/checkout/route.ts
// import Stripe from "stripe";
// import { NextResponse } from "next/server";
// import { CartItem } from "@/types/types";
// //import { CartItem } from "@/types/order";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2025-06-30.basil", // ✅ Use exact expected string
// });

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: body.items.map((item: CartItem) => ({
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: item.name,
//             images: [item.image],
//           },
//           unit_amount: item.price * 100,
//         },
//         quantity: item.quantity,
//       })),
//       success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
//     });

//     return NextResponse.json({ url: session.url });
//   } catch (error) {
//     console.error("Stripe Error", error);
//     return new NextResponse("Stripe Error", { status: 500 });
//   }
// }

// src/app/api/checkout/route.ts

import { CartItem } from "@/types/types";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-06-30.basil", // ✅ Use exact expected string
});
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { items, email }: { items: CartItem[]; email: string } = body;

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe Error", error);
    return new NextResponse("Stripe Error", { status: 500 });
  }
}
