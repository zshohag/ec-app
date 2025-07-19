// // lib/paypal.ts

// export const PAYPAL_OPTIONS = {
//   'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
//   currency: 'USD',
//   intent: 'capture',
//   'data-client-token': undefined,
// };

// export const PAYPAL_STYLE = {
//   layout: 'vertical' as const,
//   color: 'gold' as const,
//   shape: 'rect' as const,
//   label: 'paypal' as const,
//   height: 48,
//   tagline: false,
// };

// export interface PayPalOrderData {
//   intent: 'CAPTURE';
//   purchase_units: Array<{
//     amount: {
//       currency_code: string;
//       value: string;
//     };
//     description?: string;
//     reference_id?: string;
//   }>;
//   application_context?: {
//     shipping_preference: 'NO_SHIPPING' | 'GET_FROM_FILE' | 'SET_PROVIDED_ADDRESS';
//     user_action: 'PAY_NOW' | 'CONTINUE';
//     return_url?: string;
//     cancel_url?: string;
//   };
// }

// export const createPayPalOrder = (amount: number, currency = 'USD'): PayPalOrderData => {
//   return {
//     intent: 'CAPTURE',
//     purchase_units: [
//       {
//         amount: {
//           currency_code: currency.toUpperCase(),
//           value: (amount / 100).toFixed(2),
//         },
//         description: 'Purchase from Your Store',
//       },
//     ],
//     application_context: {
//       shipping_preference: 'NO_SHIPPING',
//       user_action: 'PAY_NOW',
//     },
//   };
// };

// export const validatePayPalResponse = (details: any): boolean => {
//   return (
//     details &&
//     details.status === 'COMPLETED' &&
//     details.purchase_units &&
//     details.purchase_units[0] &&
//     details.purchase_units[0].payments &&
//     details.purchase_units[0].payments.captures &&
//     details.purchase_units[0].payments.captures[0]
//   );
// };