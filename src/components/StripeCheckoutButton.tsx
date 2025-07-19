// components/StripeCheckoutButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react"; // Import useState
import { CartItem, ShippingAddress } from "@/types/types";

interface StripeCheckoutButtonProps {
  items: CartItem[];
  email: string;
  shippingAddress: Omit<ShippingAddress, "firstName" | "lastName" | "phone" | "email">; // Address details only
  onSuccessfulCheckout: () => Promise<void>;
  // We'll manage an internal loading state, so external 'loading' prop might be redundant
  // but keeping it for now if you need to control it from parent
  loading?: boolean;
  total: number; // Make total mandatory as it's crucial for Stripe
}

export default function StripeCheckoutButton({
  items,
  email,
  shippingAddress,
  onSuccessfulCheckout,
  loading: propLoading, // Rename to avoid conflict with internal state
  total,
}: StripeCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false); // Internal loading state

  const handleStripeCheckout = async () => {
    // Basic validation before hitting the API
    if (!email || !shippingAddress.address || items.length === 0) {
      toast.error("Please ensure all shipping details and cart items are provided.");
      return;
    }

    setIsLoading(true); // Set internal loading state
    toast.info("Preparing for secure checkout...");

    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items, // Use the items prop
          email, // Use the email prop
          shippingAddress: { // Use the shippingAddress prop
            address: shippingAddress.address,
            city: shippingAddress.city,
            state: shippingAddress.state,
            zipCode: shippingAddress.zipCode,
            country: shippingAddress.country,
          },
          total, // Pass the calculated total to the backend
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create Stripe Checkout Session.");
      }

      const { url } = await response.json();

      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url;
        // The onSuccessfulCheckout callback will be triggered by a Stripe webhook
        // or a successful redirect to a success page, not directly here.
        // For now, let's remove the direct call as it's typically asynchronous via webhooks.
        // If you absolutely need a client-side callback for *successful redirection*,
        // you could add it here, but actual order finalization usually happens on backend.
        // For this example, we'll assume the webhook will handle onSuccessfulCheckout via backend.
      } else {
        throw new Error("Stripe Checkout URL not received.");
      }
    } catch (error: any) {
      console.error("Stripe checkout initiation failed:", error);
      toast.error(error.message || "Stripe checkout failed. Please try again.");
    } finally {
      setIsLoading(false); // Reset internal loading state
    }
  };

  return (
    <Button
      type="button"
      onClick={handleStripeCheckout}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
      disabled={isLoading || propLoading} // Disable if either internal or prop loading is true
    >
      {(isLoading || propLoading) ? (
        "Processing..."
      ) : (
        <>
          <Lock className="w-5 h-5 mr-2" />
          Pay with Card - ${total.toFixed(2)}
        </>
      )}
    </Button>
  );
}