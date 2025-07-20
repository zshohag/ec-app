

// "use client";

// import CheckoutForm from "@/components/CheckoutForm";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { useEffect, useState } from "react";

// // Initialize stripePromise with error handling
// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
// );

// const PaymentPage = () => {
//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Ensure the Stripe publishable key is available
//     if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
//       setError("Stripe publishable key is missing. Please check your environment variables.");
//       setLoading(false);
//       return;
//     }

//     // Fetch clientSecret from the API
//     const fetchClientSecret = async () => {
//       try {
//         const response = await fetch("/api/create-payment-intent", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ amount: 5000 }), // $50.00 in cents
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch client secret");
//         }

//         const data = await response.json();
//         if (data.clientSecret) {
//           setClientSecret(data.clientSecret);
//         } else {
//           throw new Error("No client secret returned from the server");
//         }
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An error occurred while setting up the payment");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClientSecret();
//   }, []);

//   return (
//     <div className="p-10">
//       <h2 className="text-xl mb-4">Pay with Card</h2>
//       {loading && <p>Loading payment form...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {clientSecret && stripePromise && (
//         <Elements options={{ clientSecret }} stripe={stripePromise}>
//           <CheckoutForm clientSecret={clientSecret} />
//         </Elements>
//       )}
//     </div>
//   );
// };

// export default PaymentPage;


// app/payment/page.tsx
//working but not save 


// "use client";

// import CheckoutForm from "@/components/CheckoutForm";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { useAppDispatch } from "@/lib/hooks/redux";
// import { createOrder } from "@/lib/store/slices/orderSlice";
// import { clearCart } from "@/lib/store/slices/cartSlice";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// interface Item {
//   id: string;
//   name: string;
//   image: string;
//   price: number;
//   quantity: number;
// }

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
// );

// const PaymentPage = () => {
//   const searchParams = useSearchParams();
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
//       setError("Stripe publishable key is missing.");
//       setLoading(false);
//       return;
//     }

//     const amount = parseInt(searchParams.get("amount") || "0", 10);
//     const email = searchParams.get("email") || "";
//     const items = searchParams.get("items")
//       ? JSON.parse(decodeURIComponent(searchParams.get("items")!))
//       : [];
//     const shippingAddress = searchParams.get("shippingAddress")
//       ? JSON.parse(decodeURIComponent(searchParams.get("shippingAddress")!))
//       : null;

//     if (!amount || amount <= 0) {
//       setError("Invalid payment amount.");
//       setLoading(false);
//       return;
//     }

//     if (!email || !items.length || !shippingAddress) {
//       setError("Missing required payment information.");
//       setLoading(false);
//       return;
//     }

//     const fetchClientSecret = async () => {
//       try {
//         const response = await fetch("/api/create-payment-intent", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ amount, currency: "usd" }),
//         });
//         console.log("API Response status:", response.status);
//         console.log("API Response headers:", response.headers);
//         const data = await response.json();
//         console.log("API Response data:", data);
//         if (!response.ok) {
//           throw new Error(data.error || `Failed to fetch client secret (status: ${response.status})`);
//         }
//         if (data.clientSecret) {
//           setClientSecret(data.clientSecret);
//         } else {
//           throw new Error("No client secret returned from the server");
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError(err instanceof Error ? err.message : "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchClientSecret();
//   }, [searchParams]);

//   const handlePaymentSuccess = async () => {
//     try {
//       const items: Item[] = JSON.parse(decodeURIComponent(searchParams.get("items")!));
//       const shippingAddress = JSON.parse(decodeURIComponent(searchParams.get("shippingAddress")!));
//       //const amount = parseInt(searchParams.get("amount") || "0", 10);
//       const email = searchParams.get("email") || "";

//       const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//       const shipping = subtotal > 50 ? 0 : 9.99;
//       const tax = subtotal * 0.08;
//       const total = subtotal + shipping + tax;

//       const orderData = {
//         items,
//         subtotal,
//         tax,
//         shipping,
//         total,
//         shippingAddress: {
//           firstName: shippingAddress.firstName || "",
//           lastName: shippingAddress.lastName || "",
//           email,
//           phone: shippingAddress.phone || "",
//           address: shippingAddress.address,
//           city: shippingAddress.city,
//           state: shippingAddress.state,
//           zipCode: shippingAddress.zipCode,
//           country: shippingAddress.country,
//         },
//         paymentMethod: "stripe_success",
//       };

//       const result = await dispatch(createOrder(orderData)).unwrap();
//       dispatch(clearCart());
//       toast.success("Order placed successfully!");
//       router.push(`/order-confirmation/${result.id}`);
//     } catch (error) {
//       console.error("Order creation failed after Stripe:", error);
//       toast.error("Failed to finalize order after payment. Please contact support.");
//     }
//   };

//   return (
//     <div className="p-10">
//       <h2 className="text-xl mb-4">Pay with Card</h2>
//       {loading && <p>Loading payment form...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {clientSecret && stripePromise && (
//         <Elements options={{ clientSecret }} stripe={stripePromise}>
//           <CheckoutForm clientSecret={clientSecret} onPaymentSuccess={handlePaymentSuccess} />
//         </Elements>
//       )}
//     </div>
//   );
// };

// export default PaymentPage;


//// NEW TRY  

"use client";

import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks/redux";
import { createOrder } from "@/lib/store/slices/orderSlice";
import { clearCart } from "@/lib/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react"; // Add this import

interface Item {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const PaymentPage = () => {
  const { data: session } = useSession(); // Add session hook
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      setError("Stripe publishable key is missing.");
      setLoading(false);
      return;
    }

    // Check if user is authenticated
    if (!session) {
      setError("Please log in to complete payment.");
      setLoading(false);
      return;
    }

    const amount = parseInt(searchParams.get("amount") || "0", 10);
    const email = searchParams.get("email") || "";
    const items = searchParams.get("items")
      ? JSON.parse(decodeURIComponent(searchParams.get("items")!))
      : [];
    const shippingAddress = searchParams.get("shippingAddress")
      ? JSON.parse(decodeURIComponent(searchParams.get("shippingAddress")!))
      : null;

    if (!amount || amount <= 0) {
      setError("Invalid payment amount.");
      setLoading(false);
      return;
    }

    if (!email || !items.length || !shippingAddress) {
      setError("Missing required payment information.");
      setLoading(false);
      return;
    }

    const fetchClientSecret = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, currency: "usd" }),
        });
        console.log("API Response status:", response.status);
        const data = await response.json();
        console.log("API Response data:", data);
        if (!response.ok) {
          throw new Error(data.error || `Failed to fetch client secret (status: ${response.status})`);
        }
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          throw new Error("No client secret returned from the server");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchClientSecret();
  }, [searchParams, session]);

  const handlePaymentSuccess = async () => {
    try {
      if (!session?.user?.email) {
        throw new Error("User not authenticated");
      }

      const items: Item[] = JSON.parse(decodeURIComponent(searchParams.get("items")!));
      const shippingAddress = JSON.parse(decodeURIComponent(searchParams.get("shippingAddress")!));
      const email = decodeURIComponent(searchParams.get("email") || "");

      console.log("Payment success - processing data:");
      console.log("Items:", items);
      console.log("Shipping Address:", shippingAddress);
      console.log("Email:", email);

      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const shipping = subtotal > 50 ? 0 : 9.99;
      const tax = subtotal * 0.08;
      const total = subtotal + shipping + tax;

      // Transform items to match CartItem interface
      const transformedItems = items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        inStock: true,
        category: '', // Add default or get from item if available
      }));

      const orderData = {
        items: transformedItems,
        subtotal,
        tax,
        shipping,
        total,
        shippingAddress: {
          firstName: shippingAddress.firstName || session.user?.name?.split(' ')[0] || 'Not Provided',
          lastName: shippingAddress.lastName || session.user?.name?.split(' ')[1] || 'Not Provided',
          email: email || session.user.email || '',
          phone: shippingAddress.phone || 'Not Provided',
          address: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          zipCode: shippingAddress.zipCode,
          country: shippingAddress.country,
        },
        paymentMethod: "credit_card", // Use standard payment method
      };

      console.log("Creating order with data:", orderData);
      
      const result = await dispatch(createOrder(orderData)).unwrap();
      console.log("Order created successfully:", result);
      
      dispatch(clearCart());
      toast.success("Order placed successfully!");
      router.push(`/order-confirmation/${result.id}`);
    } catch (error) {
      console.error("Order creation failed after Stripe:", error);
      toast.error("Failed to finalize order after payment. Please contact support.");
    }
  };

  // Show login prompt if not authenticated
  if (!session) {
    return (
      <div className="p-10">
        <h2 className="text-xl mb-4">Authentication Required</h2>
        <p className="text-red-500">Please log in to complete your payment.</p>
        <button 
          onClick={() => router.push('/login')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h2 className="text-xl mb-4">Pay with Card</h2>
      {loading && <p>Loading payment form...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {clientSecret && stripePromise && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} onPaymentSuccess={handlePaymentSuccess} />
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;