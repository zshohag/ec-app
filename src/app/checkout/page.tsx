// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
// import { createOrder } from "@/lib/store/slices/orderSlice";
// import { clearCart } from "@/lib/store/slices/cartSlice";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Truck, Shield, ArrowLeft, Lock } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { toast } from "sonner";
// import { useSession } from "next-auth/react";
// import PaymentMethods from "@/components/Payment-methods";
// import StripeCheckoutButton from "@/components/StripeCheckoutButton";

// export default function CheckoutPage() {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const { items, total, itemCount } = useAppSelector((state) => state.cart);
//   const { loading } = useAppSelector((state) => state.order);
//   const { data: session } = useSession();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: session?.user?.email || "", // Pre-fill from session
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     country: "United States",
//     paymentMethod: "credit_card",
//   });

//   useEffect(() => {
//     if (session?.user?.email) {
//       setFormData((prev) => ({
//         ...prev,
//         email: session.user.email || "", // Ensure it's a string
//       }));
//     }
//   }, [session]);

//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   const shipping = total > 50 ? 0 : 9.99;
//   const tax = total * 0.08;
//   const finalTotal = total + shipping + tax;

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors: { [key: string]: string } = {};

//     if (!formData.firstName) newErrors.firstName = "First name is required";
//     if (!formData.lastName) newErrors.lastName = "Last name is required";
//     if (!formData.email) newErrors.email = "Email is required";
//     if (!formData.phone) newErrors.phone = "Phone number is required";
//     if (!formData.address) newErrors.address = "Address is required";
//     if (!formData.city) newErrors.city = "City is required";
//     if (!formData.state) newErrors.state = "State is required";
//     if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";

//     // Email validation
//     if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     if (items.length === 0) {
//       toast.error("Your cart is empty");
//       return;
//     }

//     // If payment method is not credit card, proceed with direct order creation
//     if (formData.paymentMethod !== "credit_card") {
//       try {
//         const orderData = {
//           items,
//           subtotal: total,
//           tax,
//           shipping,
//           total: finalTotal,
//           shippingAddress: {
//             firstName: formData.firstName,
//             lastName: formData.lastName,
//             email: formData.email,
//             phone: formData.phone,
//             address: formData.address,
//             city: formData.city,
//             state: formData.state,
//             zipCode: formData.zipCode,
//             country: formData.country,
//           },
//           paymentMethod: formData.paymentMethod,
//         };

//         const result = await dispatch(createOrder(orderData)).unwrap();

//         toast.success("Order placed successfully!");
//         router.push(`/order-confirmation/${result.id}`);
//         // Clear cart after successful order
//         dispatch(clearCart());
//       } catch (error) {
//         console.error("Order creation failed:", error);
//         toast.error("Failed to place order. Please try again.");
//       }
//     }
//     // If payment method is credit_card, the StripeCheckoutButton will handle the submission
//   };

//   if (items.length === 0) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <div className="text-center py-20">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">
//             Your Cart is Empty
//           </h1>
//           <p className="text-gray-600 mb-8">
//             Add some items to your cart before proceeding to checkout.
//           </p>
//           <Link href="/products">
//             <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
//               <ArrowLeft className="w-5 h-5 mr-2" />
//               Continue Shopping
//             </Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12">
//       {/* Header */}
//       <div className="flex items-center gap-4 mb-8">
//         <Link href="/cart">
//           <Button variant="outline" size="sm">
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Cart
//           </Button>
//         </Link>
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
//           <p className="text-gray-600">Complete your order</p>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Left Column - Forms */}
//           <div className="space-y-6">
//             {/* Shipping Information */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Truck className="w-5 h-5" />
//                   Shipping Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="firstName">First Name *</Label>
//                     <Input
//                       id="firstName"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleInputChange}
//                       className={errors.firstName ? "border-red-500" : ""}
//                     />
//                     {errors.firstName && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.firstName}
//                       </p>
//                     )}
//                   </div>
//                   <div>
//                     <Label htmlFor="lastName">Last Name *</Label>
//                     <Input
//                       id="lastName"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleInputChange}
//                       className={errors.lastName ? "border-red-500" : ""}
//                     />
//                     {errors.lastName && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.lastName}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <Label htmlFor="email">Email *</Label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className={errors.email ? "border-red-500" : ""}
//                   />
//                   {errors.email && (
//                     <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                   )}
//                 </div>

//                 <div>
//                   <Label htmlFor="phone">Phone Number *</Label>
//                   <Input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className={errors.phone ? "border-red-500" : ""}
//                   />
//                   {errors.phone && (
//                     <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
//                   )}
//                 </div>

//                 <div>
//                   <Label htmlFor="address">Street Address *</Label>
//                   <Input
//                     id="address"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     className={errors.address ? "border-red-500" : ""}
//                   />
//                   {errors.address && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.address}
//                     </p>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="city">City *</Label>
//                     <Input
//                       id="city"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleInputChange}
//                       className={errors.city ? "border-red-500" : ""}
//                     />
//                     {errors.city && (
//                       <p className="text-red-500 text-sm mt-1">{errors.city}</p>
//                     )}
//                   </div>
//                   <div>
//                     <Label htmlFor="state">State *</Label>
//                     <Input
//                       id="state"
//                       name="state"
//                       value={formData.state}
//                       onChange={handleInputChange}
//                       className={errors.state ? "border-red-500" : ""}
//                     />
//                     {errors.state && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.state}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <Label htmlFor="zipCode">ZIP Code *</Label>
//                   <Input
//                     id="zipCode"
//                     name="zipCode"
//                     value={formData.zipCode}
//                     onChange={handleInputChange}
//                     className={errors.zipCode ? "border-red-500" : ""}
//                   />
//                   {errors.zipCode && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.zipCode}
//                     </p>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Payment Method */}
//             <PaymentMethods
//               selectedPaymentMethod={formData.paymentMethod}
//               onPaymentMethodChange={(value) =>
//                 setFormData((prev) => ({ ...prev, paymentMethod: value }))
//               }
//             />
//           </div>

//           {/* Right Column - Order Summary */}
//           <div>
//             <Card className="sticky top-6">
//               <CardHeader>
//                 <CardTitle>Order Summary</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {/* Order Items */}
//                 <div className="space-y-3 mb-6">
//                   {items.map((item) => (
//                     <div key={item.id} className="flex items-center gap-3">
//                       <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
//                         <Image
//                           src={item.image}
//                           alt={item.name}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <h4 className="font-medium text-sm truncate">
//                           {item.name}
//                         </h4>
//                         <div className="flex items-center gap-2 text-xs text-gray-600">
//                           <span>Qty: {item.quantity}</span>
//                           <span>×</span>
//                           <span>${item.price}</span>
//                         </div>
//                       </div>
//                       <div className="text-sm font-medium">
//                         {(item.price * item.quantity).toFixed(2)}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Price Breakdown */}
//                 <div className="space-y-2 mb-6 pt-4 border-t">
//                   <div className="flex justify-between text-sm">
//                     <span>Subtotal ({itemCount} items)</span>
//                     <span>${total.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span>Shipping</span>
//                     <span>
//                       {shipping === 0 ? (
//                         <span className="text-green-600">Free</span>
//                       ) : (
//                         `$${shipping.toFixed(2)}`
//                       )}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span>Tax</span>
//                     <span>${tax.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-lg font-bold pt-2 border-t">
//                     <span>Total</span>
//                     <span>${finalTotal.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 {/* Conditional rendering of buttons based on payment method */}
//                 {formData.paymentMethod === "credit_card" ? (
//                   <StripeCheckoutButton
//                     items={items}
//                     email={formData.email}
//                     shippingAddress={{
//                       address: formData.address,
//                       city: formData.city,
//                       state: formData.state,
//                       zipCode: formData.zipCode,
//                       country: formData.country,
//                     }}
//                     onSuccessfulCheckout={async () => {
//                       // Call the local createOrder logic after successful Stripe checkout
//                       try {
//                         const orderData = {
//                           items,
//                           subtotal: total,
//                           tax,
//                           shipping,
//                           total: finalTotal,
//                           shippingAddress: {
//                             firstName: formData.firstName,
//                             lastName: formData.lastName,
//                             email: formData.email,
//                             phone: formData.phone,
//                             address: formData.address,
//                             city: formData.city,
//                             state: formData.state,
//                             zipCode: formData.zipCode,
//                             country: formData.country,
//                           },
//                           paymentMethod: "stripe_success", // Indicate payment via Stripe
//                         };

//                         const result = await dispatch(
//                           createOrder(orderData)
//                         ).unwrap();
//                         dispatch(clearCart());
//                         toast.success("Order placed successfully!");
//                         router.push(`/order-confirmation/${result.id}`);
//                       } catch (error) {
//                         console.error(
//                           "Order creation failed after Stripe:",
//                           error
//                         );
//                         toast.error(
//                           "Failed to finalize order after payment. Please contact support."
//                         );
//                       }
//                     }}
//                     loading={loading} // Pass the loading state
//                     total={finalTotal} // Pass the finalTotal for display
//                   />
//                 ) : (
//                   <Button
//                     type="submit"
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       "Processing..."
//                     ) : (
//                       <>
//                         <Lock className="w-5 h-5 mr-2" />
//                         Place Order - ${finalTotal.toFixed(2)}
//                       </>
//                     )}
//                   </Button>
//                 )}

//                 {/* Security Badge */}
//                 <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
//                   <Shield className="w-4 h-4 text-green-500" />
//                   <span>Secure SSL Encrypted Checkout</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>


          
//         </div>
//       </form>
//     </div>
//   );
// }

// /////NEW

// // app/checkout/page.ts

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { createOrder } from "@/lib/store/slices/orderSlice";
import { clearCart } from "@/lib/store/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck, Shield, ArrowLeft, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import PaymentMethods from "@/components/Payment-methods";
import StripeCheckoutButton from "@/components/StripeCheckoutButton";
import GooglePayButton from "@/components/GooglePayButton";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, total, itemCount } = useAppSelector((state) => state.cart);
  const { loading } = useAppSelector((state) => state.order);
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: session?.user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    paymentMethod: "credit_card",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  useEffect(() => {
    if (session?.user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: session.user.email || "",
      }));
    }
  }, [session]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (formData.paymentMethod === "google_pay") {
      // Google Pay handling is delegated to GooglePayButton
      return;
    }

    if (formData.paymentMethod !== "credit_card") {
      try {
        const orderData = {
          items,
          subtotal: total,
          tax,
          shipping,
          total: finalTotal,
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
          paymentMethod: formData.paymentMethod,
        };

        const result = await dispatch(createOrder(orderData)).unwrap();
        toast.success("Order placed successfully!");
        router.push(`/order-confirmation/${result.id}`);
        dispatch(clearCart());
      } catch (error) {
        console.error("Order creation failed:", error);
        toast.error("Failed to place order. Please try again.");
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some items to your cart before proceeding to checkout.
          </p>
          <Link href="/products">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/cart">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600">Complete your order</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={errors.state ? "border-red-500" : ""}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={errors.zipCode ? "border-red-500" : ""}
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.zipCode}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <PaymentMethods
                selectedPaymentMethod={formData.paymentMethod}
                onPaymentMethodChange={(value) =>
                  setFormData((prev) => ({ ...prev, paymentMethod: value }))
                }
              />
            </div>

            <div>
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span>Qty: {item.quantity}</span>
                            <span>×</span>
                            <span>${item.price}</span>
                          </div>
                        </div>
                        <div className="text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 mb-6 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({itemCount} items)</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {formData.paymentMethod === "credit_card" ? (
                    <StripeCheckoutButton
                      items={items}
                      email={formData.email}
                      shippingAddress={{
                        address: formData.address,
                        city: formData.city,
                        state: formData.state,
                        zipCode: formData.zipCode,
                        country: formData.country,
                      }}
                      onSuccessfulCheckout={async () => {
                        try {
                          const orderData = {
                            items,
                            subtotal: total,
                            tax,
                            shipping,
                            total: finalTotal,
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
                            paymentMethod: "stripe_success",
                          };

                          const result = await dispatch(
                            createOrder(orderData)
                          ).unwrap();
                          dispatch(clearCart());
                          toast.success("Order placed successfully!");
                          router.push(`/order-confirmation/${result.id}`);
                        } catch (error) {
                          console.error(
                            "Order creation failed after Stripe:",
                            error
                          );
                          toast.error(
                            "Failed to finalize order after payment. Please contact support."
                          );
                        }
                      }}
                      loading={loading}
                      total={finalTotal}
                    />
                  ) : formData.paymentMethod === "google_pay" ? (
                    <GooglePayButton
                      items={items}
                      total={finalTotal}
                      formData={formData}
                      validateForm={validateForm}
                      onSuccessfulCheckout={async (orderId: string) => {
                        dispatch(clearCart());
                        toast.success("Order placed successfully!");
                        router.push(`/order-confirmation/${orderId}`);
                      }}
                      loading={loading}
                    />
                  ) : (
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        "Processing..."
                      ) : (
                        <>
                          <Lock className="w-5 h-5 mr-2" />
                          Place Order - ${finalTotal.toFixed(2)}
                        </>
                      )}
                    </Button>
                  )}

                  <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Secure SSL Encrypted Checkout</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    );
}
