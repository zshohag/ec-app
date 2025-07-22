"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { toast } from "sonner";

import { CartItem } from "@/types/types";

interface PayPalCheckoutButtonProps {
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
  total: number;
  loading: boolean;
}

export default function PayPalCheckoutButton({
  onSuccessfulCheckout,
  total,
  loading,
}: PayPalCheckoutButtonProps) {
  const [isPaying, setIsPaying] = useState(false);

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: "USD",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical", label: "paypal" }}
        createOrder={(_, actions) => {
          return actions.order.create({
            intent: "CAPTURE", // Added intent property
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: total.toFixed(2),
                },
              },
            ],
            application_context: {
              shipping_preference: "NO_SHIPPING",
            },
          });
        }}
        onApprove={async (data, actions) => {
          setIsPaying(true);
          try {
            const details = await actions.order?.capture();
            console.log("✅ Payment Successful:", details);
            toast.success("PayPal Payment Successful!");
            await onSuccessfulCheckout();
          } catch (err) {
            console.log(err);
            toast.error("Failed to capture payment.");
          } finally {
            setIsPaying(false);
          }
        }}
        onError={(err) => {
          console.error("❌ PayPal Error", err);
          toast.error("Something went wrong with PayPal.");
        }}
        disabled={loading || isPaying}
      />
    </PayPalScriptProvider>
  );
}