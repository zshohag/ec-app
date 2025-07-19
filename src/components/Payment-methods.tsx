// "use client"

// import { useState } from "react"
// import { CreditCard, Building2, DollarSign } from "lucide-react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import CardInputForm from "./components/card-input-form"

// const paymentMethods = [
//   {
//     id: "stripe",
//     name: "Stripe",
//     description: "Secure online payments",
//     icon: "/icons/stripe.png",
//     color: "bg-gradient-to-r from-purple-500 to-blue-600",
//     popular: true,
//     requiresCard: false,
//   },
//   {
//     id: "credit-card",
//     name: "Credit Card",
//     description: "Visa, Mastercard, Discover",
//     icon: "/icons/visa.png",
//     color: "bg-gradient-to-r from-blue-500 to-cyan-600",
//     requiresCard: true,
//   },
//   {
//     id: "debit-card",
//     name: "Debit Card",
//     description: "Direct bank payment",
//     icon: "/icons/mastercard.png",
//     color: "bg-gradient-to-r from-green-500 to-emerald-600",
//     requiresCard: true,
//   },
//   {
//     id: "amex",
//     name: "American Express",
//     description: "Premium card payments",
//     icon: "/icons/amex.png",
//     color: "bg-gradient-to-r from-slate-600 to-slate-800",
//     requiresCard: true,
//   },
//   {
//     id: "google-pay",
//     name: "Google Pay",
//     description: "Pay with Google",
//     icon: "/icons/google-pay.png",
//     color: "bg-gradient-to-r from-red-500 to-yellow-500",
//     requiresCard: false,
//   },
//   {
//     id: "paypal",
//     name: "PayPal",
//     description: "Safe & secure payments",
//     icon: "/icons/paypal.png",
//     color: "bg-gradient-to-r from-blue-600 to-blue-800",
//     requiresCard: false,
//   },
//   {
//     id: "apple-pay",
//     name: "Apple Pay",
//     description: "Touch ID & Face ID",
//     icon: "/icons/apple-pay.png",
//     color: "bg-gradient-to-r from-gray-800 to-black",
//     requiresCard: false,
//   },
//   {
//     id: "bank-transfer",
//     name: "Bank Transfer",
//     description: "Direct bank account",
//     icon: Building2,
//     color: "bg-gradient-to-r from-indigo-500 to-purple-600",
//     requiresCard: false,
//   },
// ]

// export default function PaymentMethods() {
//   const [selectedMethod, setSelectedMethod] = useState("stripe")
//   const selectedPaymentMethod = paymentMethods.find((m) => m.id === selectedMethod)

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-8">
//       <div className="text-center space-y-2">
//         <h1 className="text-3xl font-bold tracking-tight">Choose Payment Method</h1>
//         <p className="text-muted-foreground">Select your preferred way to pay securely</p>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {paymentMethods.map((method) => {
//                 return (
//                   <div key={method.id} className="relative">
//                     <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
//                     <Label htmlFor={method.id} className="cursor-pointer block">
//                       <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-105 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary peer-data-[state=checked]:shadow-lg">
//                         <CardHeader className="pb-3">
//                           <div className="flex items-center justify-between">
//                             <div
//                               className={`p-3 rounded-lg ${method.color} text-white flex items-center justify-center`}
//                             >
//                               {typeof method.icon === "string" ? (
//                                 <img
//                                   src={method.icon || "/placeholder.svg"}
//                                   alt={method.name}
//                                   className="h-6 w-6 object-contain filter brightness-0 invert"
//                                 />
//                               ) : (
//                                 <method.icon className="h-6 w-6" />
//                               )}
//                             </div>
//                             {method.popular && (
//                               <Badge variant="secondary" className="text-xs">
//                                 Popular
//                               </Badge>
//                             )}
//                           </div>
//                         </CardHeader>
//                         <CardContent className="pt-0">
//                           <CardTitle className="text-lg mb-1">{method.name}</CardTitle>
//                           <CardDescription className="text-sm">{method.description}</CardDescription>
//                         </CardContent>
//                       </Card>
//                     </Label>
//                   </div>
//                 )
//               })}
//             </div>
//           </RadioGroup>
//         </div>

//         <div className="space-y-6">
//           {/* Card Input Form */}
//           {selectedPaymentMethod?.requiresCard && <CardInputForm paymentMethod={selectedMethod} />}

//           {/* Payment Summary Card */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-lg">Payment Summary</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>$99.00</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Processing Fee</span>
//                 <span>$2.99</span>
//               </div>
//               <div className="border-t pt-3">
//                 <div className="flex justify-between font-semibold text-lg">
//                   <span>Total</span>
//                   <span>$101.99</span>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <div className={`p-1 rounded ${selectedPaymentMethod?.color}`}>
//                   {typeof selectedPaymentMethod?.icon === "string" ? (
//                     <img
//                       src={selectedPaymentMethod.icon || "/placeholder.svg"}
//                       alt={selectedPaymentMethod.name}
//                       className="h-3 w-3 object-contain filter brightness-0 invert"
//                     />
//                   ) : selectedPaymentMethod?.icon ? (
//                     <selectedPaymentMethod.icon className="h-3 w-3 text-white" />
//                   ) : (
//                     <CreditCard className="h-3 w-3 text-white" />
//                   )}
//                 </div>
//                 <span>Paying with {selectedPaymentMethod?.name}</span>
//               </div>
//             </CardContent>
//           </Card>

//           <Button size="lg" className="w-full">
//             <DollarSign className="mr-2 h-4 w-4" />
//             Complete Payment
//           </Button>

//           <p className="text-sm text-muted-foreground text-center">
//             🔒 Your payment information is secure and encrypted
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import PaymentAccordion from "./Payment-accordion"


export default function PaymentMethods() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Payment Information</h1>
        <p className="text-muted-foreground">Choose your preferred payment method</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-2">
        <div className="lg:col-span-3">
          <PaymentAccordion />
        </div>

        <div className="space-y-6">
          {/* Order Summary */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$99.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$8.91</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Fee</span>
                <span>$2.99</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>$110.90</span>
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/* Security Features */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">🔒 Secure Checkout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>256-bit SSL encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>PCI DSS compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Fraud protection</span>
              </div>
            </CardContent>
          </Card> */}

          {/* Action Button */}
          {/* <Button size="lg" className="w-full">
            <DollarSign className="mr-2 h-4 w-4" />
            Complete Payment
          </Button> */}

          {/* Trust Badges */}
          {/* <div className="flex justify-center gap-2">
            <Badge variant="outline" className="text-xs">
              Money Back Guarantee
            </Badge>
            <Badge variant="outline" className="text-xs">
              24/7 Support
            </Badge>
          </div> */}
        </div>
      </div>
    </div>
  )
}
