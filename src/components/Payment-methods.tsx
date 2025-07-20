// // components/Payment-methods.tsx
// // This component should be a client component if it uses hooks like useState or receives interactive props.
// // "use client"; // Add this if there's any client-side interactivity within PaymentMethods itself

// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { CreditCard } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// // Define the props interface for your PaymentMethods component
// interface PaymentMethodsProps {
//   selectedPaymentMethod: string;
//   onPaymentMethodChange: (value: string) => void; // Make sure the type matches what RadioGroup expects
// }

// export default function PaymentMethods({
//   selectedPaymentMethod,
//   onPaymentMethodChange,
// }: PaymentMethodsProps) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <CreditCard className="w-5 h-5" />
//           Payment Method
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <RadioGroup
//           value={selectedPaymentMethod}
//           onValueChange={onPaymentMethodChange}
//         >
//           <div className="flex items-center space-x-2 p-3 border rounded-lg">
//             <RadioGroupItem value="credit_card" id="credit_card" />
//             <Label
//               htmlFor="credit_card"
//               className="flex items-center gap-2 cursor-pointer"
//             >
//               <CreditCard className="w-4 h-4" />
//               Credit Card
//             </Label>
//           </div>
//           <div className="flex items-center space-x-2 p-3 border rounded-lg">
//             <RadioGroupItem value="paypal" id="paypal" />
//             <Label htmlFor="paypal" className="cursor-pointer">
//               PayPal
//             </Label>
//           </div>
//           <div className="flex items-center space-x-2 p-3 border rounded-lg">
//             <RadioGroupItem value="apple_pay" id="apple_pay" />
//             <Label htmlFor="apple_pay" className="cursor-pointer">
//               Apple Pay
//             </Label>
//           </div>
//         </RadioGroup>
//       </CardContent>
//     </Card>
//   );
// }

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

// Define the props interface for the PaymentMethods component
interface PaymentMethodsProps {
  selectedPaymentMethod: string;
  onPaymentMethodChange: (value: string) => void;
}

export default function PaymentMethods({
  selectedPaymentMethod,
  onPaymentMethodChange,
}: PaymentMethodsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedPaymentMethod}
          onValueChange={onPaymentMethodChange}
        >
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="credit_card" id="credit_card" />
            <Label
              htmlFor="credit_card"
              className="flex items-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              Credit Card
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label
              htmlFor="paypal"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Image
                src="/paypal-icon.svg" // Add PayPal icon to your public folder
                alt="PayPal"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              PayPal
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="google_pay" id="google_pay" />
            <Label
              htmlFor="google_pay"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Image
                src="/google-pay-icon.svg" // Add Google Pay icon to your public folder
                alt="Google Pay"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              Google Pay
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}