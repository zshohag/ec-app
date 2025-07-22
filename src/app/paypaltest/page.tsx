// "use client";

// import { useState } from "react";
// import PayPalCheckoutButton from "@/components/PayPalCheckoutButton";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { CartItem } from "@/types/types";

// // Mock cart items for testing
// const mockCartItems: CartItem[] = [
//   {
//     id: "1",
//     name: "Test Product 1",
//     price: 29.99,
//     quantity: 2,
//     images: ["/test-image.jpg"],
//     category: "electronics",
//   },
//   {
//     id: "2", 
//     name: "Test Product 2",
//     price: 19.99,
//     quantity: 1,
//     images: ["/test-image2.jpg"],
//     category: "clothing",
//   }
// ];

// export default function PayPalTestPage() {
//   const [loading, setLoading] = useState(false);
//   const [orderCompleted, setOrderCompleted] = useState(false);

//   const mockShippingAddress = {
//     address: "123 Test Street",
//     city: "Test City",
//     state: "TS",
//     zipCode: "12345",
//     country: "US"
//   };

//   const total = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   const tax = total * 0.08;
//   const shipping = 9.99;
//   const finalTotal = total + tax + shipping;

//   const handleSuccessfulCheckout = async () => {
//     setLoading(true);
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 2000));
//     console.log("✅ Order created successfully!");
//     setOrderCompleted(true);
//     setLoading(false);
//   };

//   const resetTest = () => {
//     setOrderCompleted(false);
//     setLoading(false);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-8">
//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle>PayPal Integration Test Page</CardTitle>
//           <p className="text-gray-600">Test your PayPal integration with sandbox accounts</p>
//         </CardHeader>
//         <CardContent>
//           <div className="bg-blue-50 p-4 rounded-lg mb-6">
//             <h3 className="font-semibold text-blue-900 mb-2">Test Instructions:</h3>
//             <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
//               <li>Click the PayPal button below</li>
//               <li>Use these test credentials when PayPal opens:</li>
//               <ul className="ml-6 mt-2 space-y-1">
//                 <li><strong>Email:</strong> sb-buyer@business.example.com</li>
//                 <li><strong>Password:</strong> testpassword123</li>
//               </ul>
//               <li>Or create a PayPal sandbox account at <a href="https://developer.paypal.com" className="underline" target="_blank">developer.paypal.com</a></li>
//               <li>Complete the payment flow</li>
//             </ol>
//           </div>

//           {!orderCompleted ? (
//             <div className="grid md:grid-cols-2 gap-8">
//               {/* Order Summary */}
//               <div>
//                 <h3 className="font-semibold mb-4">Test Order Summary</h3>
//                 <div className="space-y-3 border rounded-lg p-4">
//                   {mockCartItems.map((item) => (
//                     <div key={item.id} className="flex justify-between items-center">
//                       <div>
//                         <div className="font-medium">{item.name}</div>
//                         <div className="text-sm text-gray-600">
//                           Qty: {item.quantity} × ${item.price}
//                         </div>
//                       </div>
//                       <div className="font-medium">
//                         ${(item.price * item.quantity).toFixed(2)}
//                       </div>
//                     </div>
//                   ))}
                  
//                   <div className="border-t pt-3 space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span>Subtotal</span>
//                       <span>${total.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span>Tax</span>
//                       <span>${tax.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span>Shipping</span>
//                       <span>${shipping.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between font-bold text-lg border-t pt-2">
//                       <span>Total</span>
//                       <span>${finalTotal.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* PayPal Payment */}
//               <div>
//                 <h3 className="font-semibold mb-4">PayPal Payment</h3>
//                 <div className="border rounded-lg p-4">
//                   <PayPalCheckoutButton
//                     items={mockCartItems}
//                     email="test@example.com"
//                     shippingAddress={mockShippingAddress}
//                     onSuccessfulCheckout={handleSuccessfulCheckout}
//                     total={finalTotal}
//                     loading={loading}
//                   />
//                 </div>

//                 {loading && (
//                   <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//                     <p className="text-yellow-800">Processing order...</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-8">
//               <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
//                 <h3 className="text-green-800 font-semibold text-lg mb-2">
//                   🎉 Payment Successful!
//                 </h3>
//                 <p className="text-green-700">
//                   Your PayPal integration is working correctly.
//                 </p>
//               </div>
//               <Button onClick={resetTest} className="bg-blue-600 hover:bg-blue-700">
//                 Test Again
//               </Button>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* Developer Notes */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Developer Notes</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4 text-sm">
//           <div>
//             <h4 className="font-semibold">Sandbox Test Accounts:</h4>
//             <p>PayPal provides test buyer accounts. You can also create your own at:</p>
//             <a href="https://developer.paypal.com/tools/sandbox/" 
//                className="text-blue-600 underline" target="_blank">
//               https://developer.paypal.com/tools/sandbox/
//             </a>
//           </div>
          
//           <div>
//             <h4 className="font-semibold">For Production:</h4>
//             <ul className="list-disc list-inside space-y-1 text-gray-600">
//               <li>Create a live PayPal app at developer.paypal.com</li>
//               <li>Replace the sandbox client ID with your live client ID</li>
//               <li>Set NEXT_PUBLIC_PAYPAL_ENVIRONMENT=live</li>
//               <li>Test thoroughly with small amounts first</li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-semibold">Common Issues:</h4>
//             <ul className="list-disc list-inside space-y-1 text-gray-600">
//               <li>Make sure your domain is added to your PayPal app settings</li>
//               <li>Check browser console for any script loading errors</li>
//               <li>Verify your client ID is correct</li>
//               <li>Ensure amounts are properly formatted (2 decimal places)</li>
//             </ul>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }