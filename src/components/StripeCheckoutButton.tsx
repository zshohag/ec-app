// components/StripeCheckoutButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/types";
import Image from "next/image";

interface StripeCheckoutButtonProps {
  items: CartItem[];
  email: string;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  onSuccessfulCheckout: () => Promise<void>;
  loading: boolean;
  total: number; // finalTotal from CheckoutPage
}

export default function StripeCheckoutButton({
  items, // eslint-disable-line @typescript-eslint/no-unused-vars
  email,
  shippingAddress, // eslint-disable-line @typescript-eslint/no-unused-vars
  onSuccessfulCheckout, // eslint-disable-line @typescript-eslint/no-unused-vars
  loading,
  total,
}: StripeCheckoutButtonProps) {
  const router = useRouter();

  const handleStripeCheckout = async () => {
    try {
      const amountInCents = Math.round(total * 100); // Convert to cents
      // Serialize items and shippingAddress for query parameters
      const query = new URLSearchParams({
        amount: amountInCents.toString(),
        email: encodeURIComponent(email),
        items: encodeURIComponent(JSON.stringify(items)),
        shippingAddress: encodeURIComponent(JSON.stringify(shippingAddress)),
      });
      router.push(`/payment?${query.toString()}`);
    } catch (error) {
      console.error("Error initiating Stripe checkout:", error);
    }
  };

  return (
    <Button
      className="w-full  text-white  py-3 text-lg"
      onClick={handleStripeCheckout}
      disabled={loading}
    >
      {loading ? (
        "Processing..."
      ) : (
        <>
          {/* <CreditCard className="w-4 h-4" />
          Pay with Card - ${total.toFixed(2)} */}
          <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
            <span>Pay with Card</span>
            <Image
              src="/images/credit.png"
              alt="Credit Card"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>${total.toFixed(2)}</span>
          </div>
        </>
      )}
    </Button>
  );
}
