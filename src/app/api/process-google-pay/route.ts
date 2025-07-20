//WORK BUT NOT PROPERly

// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";

// // Define interfaces for type safety
// interface OrderItem {
//   id: string;
//   name: string;
//   quantity: number;
//   price: number;
// }

// interface ShippingAddress {
//   line1: string;
//   city: string;
//   state: string;
//   postal_code: string;
//   country: string;
// }

// interface OrderDetails {
//   email: string;
//   items: OrderItem[];
//   shippingAddress: ShippingAddress;
// }

// interface RequestBody {
//   paymentToken: string;
//   amount: number;
//   currency?: string;
//   paymentData?: unknown;
//   orderDetails: OrderDetails;
// }

// // Initialize Stripe
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-06-30.basil", // Updated to a valid API version
// });

// export async function POST(request: NextRequest) {
//   try {
//     const body: RequestBody = await request.json();
//     const {
//       paymentToken,
//       amount,
//       currency = "usd",
//       orderDetails
//     } = body;

//     // Validate required fields
//     if (!paymentToken || !amount || !orderDetails) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Create payment method first
//     const paymentMethod = await stripe.paymentMethods.create({
//       type: 'card',
//       card: {
//         token: paymentToken
//       }
//     });

//     // Create payment intent with the payment method
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//       payment_method: paymentMethod.id,
//       confirmation_method: 'manual',
//       confirm: true,
//       return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-confirmation`,
//       metadata: {
//         payment_method: 'google_pay',
//         customer_email: orderDetails.email,
//         order_items: JSON.stringify(orderDetails.items.map((item: OrderItem) => ({
//           id: item.id,
//           name: item.name,
//           quantity: item.quantity,
//           price: item.price
//         }))),
//         shipping_address: JSON.stringify(orderDetails.shippingAddress)
//       }
//     });

//     // Check if payment was successful
//     if (paymentIntent.status === 'succeeded') {
//       return NextResponse.json({
//         success: true,
//         paymentIntent: {
//           id: paymentIntent.id,
//           status: paymentIntent.status,
//           amount: paymentIntent.amount,
//           currency: paymentIntent.currency
//         }
//       });
//     } else if (paymentIntent.status === 'requires_action') {
//       return NextResponse.json({
//         success: false,
//         error: "Payment requires additional authentication",
//         requiresAction: true,
//         clientSecret: paymentIntent.client_secret
//       });
//     } else {
//       return NextResponse.json({
//         success: false,
//         error: "Payment was not successful",
//         status: paymentIntent.status
//       });
//     }

//   } catch (error: unknown) {
//     console.error('Google Pay processing error:', error);

//     // Handle specific Stripe errors
//     if (error instanceof Stripe.errors.StripeCardError) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: error.message || "Your card was declined"
//         },
//         { status: 400 }
//       );
//     }

//     if (error instanceof Stripe.errors.StripeInvalidRequestError) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Invalid payment information"
//         },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: false,
//         error: "Payment processing failed. Please try again."
//       },
//       { status: 500 }
//     );
//   }
// }

//////////

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { CartItem, ShippingAddress } from "@/types/types";

interface OrderDetails {
  email: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
}

interface RequestBody {
  paymentToken: string;
  amount: number;
  currency?: string;
  paymentData?: unknown;
  orderDetails: OrderDetails;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil", // Use stable version
});

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { paymentToken, amount, currency = "usd", orderDetails } = body;

    // Validate inputs
    if (!paymentToken || !amount || !orderDetails) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Step 1: Create payment method using Google Pay token
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        token: paymentToken,
      },
    });

    // ✅ Step 2: Create PaymentIntent using the new payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethod.id,
      confirmation_method: "manual",
      confirm: true,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-confirmation`,
      metadata: {
        payment_method: "google_pay",
        customer_email: orderDetails.email,
        order_items: JSON.stringify(
          orderDetails.items.map((item: CartItem) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          }))
        ),
        shipping_address: JSON.stringify(orderDetails.shippingAddress),
      },
    });

    // ✅ Handle payment result
    if (paymentIntent.status === "succeeded") {
      return NextResponse.json({
        success: true,
        paymentIntent: {
          id: paymentIntent.id,
          status: paymentIntent.status,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
        },
      });
    } else if (paymentIntent.status === "requires_action") {
      return NextResponse.json({
        success: false,
        error: "Payment requires additional authentication",
        requiresAction: true,
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: "Payment was not successful",
        status: paymentIntent.status,
      });
    }
  } catch (error: unknown) {
    console.error("Stripe Google Pay error:", error);

    if (error instanceof Stripe.errors.StripeCardError) {
      return NextResponse.json(
        { success: false, error: error.message || "Card declined" },
        { status: 400 }
      );
    }

    if (error instanceof Stripe.errors.StripeInvalidRequestError) {
      return NextResponse.json(
        { success: false, error: "Invalid Stripe request" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Something went wrong with payment." },
      { status: 500 }
    );
  }
}
