// app/api/stripe/create-checkout-session/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { CartItem } from "@/lib/store/slices/cartSlice"; // Adjust path as needed
import { ShippingAddress } from "@/lib/types"; // Adjust path as needed

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20", // Use your desired API version
});

export async function POST(req: Request) {
  try {
    const { items, email, shippingAddress, total } = await req.json();

    if (!items || !email || !shippingAddress || !total) {
      return NextResponse.json(
        { error: "Missing required data for checkout session." },
        { status: 400 }
      );
    }

    // Transform cart items into Stripe Line Items format
    const line_items = items.map((item: CartItem) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image], // Stripe can display product images
        },
        unit_amount: Math.round(item.price * 100), // Price in cents
      },
      quantity: item.quantity,
    }));

    // Add shipping cost as a line item if applicable
    const shippingCost = total > 50 ? 0 : 9.99; // Re-calculate or pass from frontend
    if (shippingCost > 0) {
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Shipping",
            images: ["https://example.com/shipping-icon.png"], // Optional: an icon for shipping
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // You might also want to add tax as a line item or use Stripe Tax features
    // For simplicity, we're assuming the `total` from frontend already includes tax and shipping
    // and just passing that total. However, it's better to calculate tax/shipping on backend for accuracy.
    // If you strictly want the `total` from frontend, you might use 'payment_intent_data' to set a total amount
    // but line_items are preferred for product details.

    // Calculate total amount to ensure consistency with frontend if not using line_items directly
    // const calculatedTotalCents = Math.round(total * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items, // Use the generated line items
      mode: "payment",
      customer_email: email, // Pre-fills customer email
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB"], // Specify allowed countries
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: Math.round(shippingCost * 100), // Shipping in cents
              currency: 'usd',
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ],
      // If you're calculating total on frontend and want to use it
      // payment_intent_data: {
      //   amount: calculatedTotalCents, // This directly sets the total for the payment intent
      //   currency: 'usd',
      // },
      metadata: {
        // Store any data you need to retrieve later in webhooks
        userId: "user-123", // Example: replace with actual user ID
        cartId: "cart-abc", // Example: replace with actual cart ID
        // You might store a temporary order ID here, then finalize in webhook
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Session Error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: 500 }
    );
  }
}