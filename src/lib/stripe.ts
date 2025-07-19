// // lib/stripe.ts

// import { loadStripe, Stripe } from '@stripe/stripe-js';
// import type { GooglePayConfig } from '@/types/payment';

// let stripePromise: Promise<Stripe | null>;

// export const getStripe = () => {
//   if (!stripePromise) {
//     stripePromise = loadStripe(
//       process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
//     );
//   }
//   return stripePromise;
// };

// export const STRIPE_ELEMENTS_OPTIONS = {
//   appearance: {
//     theme: 'stripe' as const,
//     variables: {
//       colorPrimary: '#0570de',
//       colorBackground: '#ffffff',
//       colorText: '#30313d',
//       colorDanger: '#df1b41',
//       fontFamily: 'Inter, system-ui, sans-serif',
//       spacingUnit: '4px',
//       borderRadius: '8px',
//       focusBoxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
//     },
//     rules: {
//       '.Input': {
//         border: '1px solid #e2e8f0',
//         padding: '12px',
//         fontSize: '16px',
//         backgroundColor: '#ffffff',
//         transition: 'border-color 0.15s ease',
//       },
//       '.Input:focus': {
//         border: '1px solid #0570de',
//         boxShadow: '0 0 0 3px rgba(5, 112, 222, 0.1)',
//       },
//       '.Input--invalid': {
//         border: '1px solid #df1b41',
//       },
//       '.Label': {
//         fontSize: '14px',
//         fontWeight: '500',
//         color: '#374151',
//         marginBottom: '6px',
//       },
//     },
//   },
//   loader: 'auto' as const,
// };

// export const GOOGLE_PAY_CONFIG: GooglePayConfig = {
//   environment: 'TEST', // Change to 'PRODUCTION' for live
//   apiVersion: 2,
//   apiVersionMinor: 0,
//   allowedPaymentMethods: [
//     {
//       type: 'CARD',
//       parameters: {
//         allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
//         allowedCardNetworks: ['MASTERCARD', 'VISA'],
//       },
//       tokenizationSpecification: {
//         type: 'PAYMENT_GATEWAY',
//         parameters: {
//           gateway: 'stripe',
//           'stripe:version': '2020-08-27',
//           'stripe:publishableKey': process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
//         },
//       },
//     },
//   ],
//   merchantInfo: {
//     merchantName: 'Your Store Name',
//     merchantId: '12345678901234567890', // Replace with your Google Pay merchant ID
//   },
// };

// export const formatAmount = (amount: number): string => {
//   return (amount / 100).toFixed(2);
// };

// export const formatCurrency = (amount: number, currency = 'USD'): string => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: currency.toUpperCase(),
//   }).format(amount / 100);
// };

// export const validateAmount = (amount: number): boolean => {
//   return amount > 0 && amount <= 99999999; // Stripe's limits
// };

// export const PAYMENT_METHODS = [
//   {
//     id: 'stripe',
//     name: 'Credit Card',
//     type: 'stripe' as const,
//     icon: '💳',
//     description: 'Pay with your credit or debit card',
//     enabled: true,
//   },
//   {
//     id: 'google_pay',
//     name: 'Google Pay',
//     type: 'google_pay' as const,
//     icon: '🟡',
//     description: 'Pay with Google Pay',
//     enabled: true,
//   },
//   {
//     id: 'paypal',
//     name: 'PayPal',
//     type: 'paypal' as const,
//     icon: '🔵',
//     description: 'Pay with your PayPal account',
//     enabled: true,
//   },
// ];

// lib/stripe.ts
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-06-30.basil",
});

export default stripe;
