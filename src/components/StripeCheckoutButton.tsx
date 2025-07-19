"use client";

import { CartItem } from "@/types/order";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Props {
  items: CartItem[];
  email: string;
}

export default function StripeCheckoutButton({ items, email }: Props) {
  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, email }),
    });

    const data = await res.json();
    const stripe = await stripePromise;

    if (data.sessionId && stripe) {
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    }
  };

  return (
    <button
      className="w-full bg-black text-white p-3 rounded-md mt-4"
      onClick={handleCheckout}
    >
      Pay with Stripe
    </button>
  );
}
