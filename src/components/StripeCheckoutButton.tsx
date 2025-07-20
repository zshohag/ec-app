// // components/StripeCheckoutButton.tsx
// "use client";

// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Lock } from "lucide-react";

// interface Item {
//   id: string;
//   name: string;
//   image: string;
//   price: number;
//   quantity: number;
// }

// interface StripeCheckoutButtonProps {
//   items: Item[];
//   email: string;
//   shippingAddress: {
//     address: string;
//     city: string;
//     state: string;
//     zipCode: string;
//     country: string;
//   };
//   onSuccessfulCheckout: () => Promise<void>;
//   loading: boolean;
//   total: number; // finalTotal from CheckoutPage
// }

// export default function StripeCheckoutButton({
//   items, // eslint-disable-line @typescript-eslint/no-unused-vars
//   email,
//   shippingAddress, // eslint-disable-line @typescript-eslint/no-unused-vars
//   onSuccessfulCheckout, // eslint-disable-line @typescript-eslint/no-unused-vars
//   loading,
//   total,
// }: StripeCheckoutButtonProps) {
//   const router = useRouter();

//   const handleStripeCheckout = async () => {
//     try {
//       const amountInCents = Math.round(total * 100); // Convert to cents
//       // Serialize items and shippingAddress for query parameters
//       const query = new URLSearchParams({
//         amount: amountInCents.toString(),
//         email: encodeURIComponent(email),
//         items: encodeURIComponent(JSON.stringify(items)),
//         shippingAddress: encodeURIComponent(JSON.stringify(shippingAddress)),
//       });
//       router.push(`/payment?${query.toString()}`);
//     } catch (error) {
//       console.error("Error initiating Stripe checkout:", error);
//     }
//   };

//   return (
//     <Button
//       className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
//       onClick={handleStripeCheckout}
//       disabled={loading}
//     >
//       {loading ? (
//         "Processing..."
//       ) : (
//         <>
//           <Lock className="w-5 h-5 mr-2" />
//           Pay with Card - ${total.toFixed(2)}
//         </>
//       )}
//     </Button>
//   );
// }


//new try 

// components/StripeCheckoutButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { CartItem } from "@/types/types";


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
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
      onClick={handleStripeCheckout}
      disabled={loading}
    >
      {loading ? (
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