

"use client";

import { useEffect, useState, useCallback } from "react";
import { useAppDispatch } from "@/lib/hooks/redux";
import { createOrder } from "@/lib/store/slices/orderSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { CartItem } from "@/types/types";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: string;
}

interface GooglePayButtonProps {
  items: CartItem[];
  total: number;
  formData: FormData;
  validateForm: () => boolean;
  onSuccessfulCheckout: (orderId: string) => void;
  loading: boolean;
}

// Initialize Stripe for 3D Secure authentication
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function GooglePayButton({
  items,
  total,
  formData,
  validateForm,
  onSuccessfulCheckout,
  loading,
}: GooglePayButtonProps) {
  const dispatch = useAppDispatch();
  const [googlePayReady, setGooglePayReady] = useState(false);
  const [paymentsClient, setPaymentsClient] = useState<google.payments.api.PaymentsClient | null>(
    null
  );

  // Initialize Google Pay
  useEffect(() => {
    const initializeGooglePay = async () => {
      try {
        const paymentsClient = new google.payments.api.PaymentsClient({
          environment: "TEST", // Change to "PRODUCTION" in production
        });

        const isReadyToPayRequest: google.payments.api.IsReadyToPayRequest = {
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["AMEX", "DISCOVER", "MASTERCARD", "VISA"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "stripe",
                  "stripe:version": "2022-11-15", // Match your Stripe API version
                  "stripe:publishableKey":
                    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
                },
              },
            },
          ],
        };

        const response = await paymentsClient.isReadyToPay(isReadyToPayRequest);
        if (response.result) {
          setGooglePayReady(true);
          setPaymentsClient(paymentsClient);
        } else {
          console.warn("Google Pay is not available on this device/browser");
        }
      } catch (error) {
        console.error("Error initializing Google Pay:", error);
      }
    };

    initializeGooglePay();
  }, []);

  const handleGooglePay = useCallback(async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!paymentsClient) {
      toast.error("Google Pay is not initialized");
      return;
    }

    try {
      const paymentDataRequest: google.payments.api.PaymentDataRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: "CARD",
            parameters: {
              allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
              allowedCardNetworks: ["AMEX", "DISCOVER", "MASTERCARD", "VISA"],
            },
            tokenizationSpecification: {
              type: "PAYMENT_GATEWAY",
              parameters: {
                gateway: "stripe",
                "stripe:version": "2022-11-15",
                "stripe:publishableKey":
                  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
              },
            },
          },
        ],
        transactionInfo: {
          totalPriceStatus: "FINAL",
          totalPrice: total.toFixed(2),
          currencyCode: "USD",
          countryCode: "US",
        },
        merchantInfo: {
          merchantId: "YOUR_MERCHANT_ID", // Replace with your Google Merchant ID
          merchantName: "Your Store Name",
        },
        shippingAddressRequired: true,
        emailRequired: true,
      };

      const paymentData = await paymentsClient.loadPaymentData(
        paymentDataRequest
      );
      const paymentToken = paymentData.paymentMethodData.tokenizationData.token;

      // Send the payment token to your backend
      const response = await fetch("/api/process-google-pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentToken,
          amount: Math.round(total * 100), // Convert to cents
          currency: "usd",
          paymentData,
          orderDetails: {
            email: formData.email,
            items: items.map((item) => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
            shippingAddress: {
              line1: formData.address,
              city: formData.city,
              state: formData.state,
              postal_code: formData.zipCode,
              country: formData.country,
            },
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Create order in your system
        const orderData = {
          items,
          subtotal: items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
          tax: total * 0.08,
          shipping: total > 50 ? 0 : 9.99,
          total,
          shippingAddress: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
          },
          paymentMethod: "google_pay",
        };

        const orderResult = await dispatch(createOrder(orderData)).unwrap();
        onSuccessfulCheckout(orderResult.id);
      } else if (result.requiresAction) {
        const stripe = await stripePromise;
        if (!stripe) {
          toast.error("Stripe is not initialized");
          return;
        }
        // Handle 3D Secure authentication
        const { error } = await stripe.confirmCardPayment(result.clientSecret);
        if (error) {
          toast.error(error.message || "Payment authentication failed");
          return;
        }
        // Retry the payment after authentication
        const retryResponse = await fetch("/api/process-google-pay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentToken,
            amount: Math.round(total * 100),
            currency: "usd",
            paymentData,
            orderDetails: {
              email: formData.email,
              items: items.map((item) => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
              })),
              shippingAddress: {
                line1: formData.address,
                city: formData.city,
                state: formData.state,
                postal_code: formData.zipCode,
                country: formData.country,
              },
            },
          }),
        });

        const retryResult = await retryResponse.json();
        if (retryResult.success) {
          const orderData = {
            items,
            subtotal: items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            ),
            tax: total * 0.08,
            shipping: total > 50 ? 0 : 9.99,
            total,
            shippingAddress: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode,
              country: formData.country,
            },
            paymentMethod: "google_pay",
          };

          const orderResult = await dispatch(createOrder(orderData)).unwrap();
          onSuccessfulCheckout(orderResult.id);
        } else {
          toast.error(retryResult.error || "Payment failed after authentication");
        }
      } else {
        toast.error(result.error || "Payment failed");
      }
    } catch (error) {
      console.error("Google Pay error:", error);
      toast.error("Failed to process Google Pay payment. Please try again.");
    }
  }, [
    validateForm,
    items,
    total,
    formData,
    paymentsClient,
    dispatch,
    onSuccessfulCheckout,
  ]);

  return (
    <Button
      type="button"
      onClick={handleGooglePay}
      className="w-full bg-black text-white py-3 text-lg flex items-center justify-center gap-2"
      disabled={loading || !googlePayReady}
    >
      {loading ? (
        "Processing..."
      ) : (
        <>
          <img
            src="/google-pay-icon.svg" // Add Google Pay icon to your public folder
            alt="Google Pay"
            className="h-6 w-auto"
          />
          Pay with Google Pay - ${total.toFixed(2)}
        </>
      )}
    </Button>
  );
}
