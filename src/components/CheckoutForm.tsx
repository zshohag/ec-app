// 'use client';

// import {
//   CardElement,
//   useElements,
//   useStripe
// } from '@stripe/react-stripe-js';
// import { useState } from 'react';

// interface Props {
//   clientSecret: string;
// }

// export default function CheckoutForm({ clientSecret }: Props) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (!stripe || !elements) return;

//     const cardElement = elements.getElement(CardElement);
//     if (!cardElement) return;

//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: cardElement,
//       }
//     });

//     if (result.error) {
//       setError(result.error.message || 'Payment failed');
//     } else {
//       if (result.paymentIntent?.status === 'succeeded') {
//         setSuccess(true);
//       }
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md p-4 shadow-md bg-white rounded">
//       <CardElement />
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
//       >
//         {loading ? 'Processing...' : 'Pay Now'}
//       </button>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//       {success && <p className="text-green-600 mt-2">Payment successful!</p>}
//     </form>
//   );
// }

// components/CheckoutForm.tsx
"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

interface Props {
  clientSecret: string;
  onPaymentSuccess: () => Promise<void>;
}

const CheckoutForm: React.FC<Props> = ({ clientSecret, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (result.error) {
      setError(result.error.message || "Payment failed");
    } else if (result.paymentIntent?.status === "succeeded") {
      setSuccess(true);
      await onPaymentSuccess(); // Call onPaymentSuccess to create order
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md p-4 shadow-md bg-white rounded">
      <div className="border p-3 rounded mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": { color: "#a0aec0" },
              },
              invalid: { color: "#e53e3e" },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-2 w-full bg-blue-600 text-white py-2 rounded"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">Payment successful!</p>}
    </form>
  );
};

export default CheckoutForm;