
// components/CheckoutForm.tsx

// working but 


// "use client";

// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useState } from "react";

// interface Props {
//   clientSecret: string;
//   onPaymentSuccess: () => Promise<void>;
// }

// const CheckoutForm: React.FC<Props> = ({ clientSecret, onPaymentSuccess }) => {
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
//       },
//     });

//     if (result.error) {
//       setError(result.error.message || "Payment failed");
//     } else if (result.paymentIntent?.status === "succeeded") {
//       setSuccess(true);
//       await onPaymentSuccess(); // Call onPaymentSuccess to create order
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md p-4 shadow-md bg-white rounded">
//       <div className="border p-3 rounded mb-4">
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#32325d",
//                 "::placeholder": { color: "#a0aec0" },
//               },
//               invalid: { color: "#e53e3e" },
//             },
//           }}
//         />
//       </div>
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="mt-2 w-full bg-blue-600 text-white py-2 rounded"
//       >
//         {loading ? "Processing..." : "Pay Now"}
//       </button>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//       {success && <p className="text-green-600 mt-2">Payment successful!</p>}
//     </form>
//   );
// };

// export default CheckoutForm;


///


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
  const [processingOrder, setProcessingOrder] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setProcessingOrder(false);

    if (!stripe || !elements) {
      setError("Stripe is not loaded properly");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card element not found");
      setLoading(false);
      return;
    }

    try {
      console.log("Confirming card payment...");
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        console.error("Payment failed:", result.error);
        setError(result.error.message || "Payment failed");
      } else if (result.paymentIntent?.status === "succeeded") {
        console.log("Payment successful, creating order...");
        setSuccess(true);
        setProcessingOrder(true);
        
        try {
          await onPaymentSuccess();
          console.log("Order creation completed successfully");
        } catch (orderError) {
          console.error("Order creation failed:", orderError);
          setError("Payment successful but order creation failed. Please contact support with your payment confirmation.");
          setSuccess(false);
        } finally {
          setProcessingOrder(false);
        }
      } else {
        console.log("Payment status:", result.paymentIntent?.status);
        setError("Payment was not completed successfully");
      }
    } catch (err) {
      console.error("Error during payment process:", err);
      setError("An unexpected error occurred during payment");
    } finally {
      setLoading(false);
    }
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
        disabled={!stripe || loading || success}
        className={`mt-2 w-full py-2 rounded text-white ${
          success 
            ? "bg-green-600" 
            : loading 
            ? "bg-gray-400" 
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {processingOrder 
          ? "Creating Order..." 
          : loading 
          ? "Processing Payment..." 
          : success 
          ? "Order Processing..." 
          : "Pay Now"
        }
      </button>
      
      {error && (
        <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && !processingOrder && (
        <div className="mt-2 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
          Payment successful! Redirecting to confirmation page...
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;