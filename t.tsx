
// "use client";

// import { useParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   ShoppingCart,
//   Star,
//   Check,
//   Truck,
//   RotateCcw,
//   Shield,
// } from "lucide-react";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import Link from "next/link";
// import { useProduct, useProducts } from "@/lib/api/products";

// export default function ProductDetailsPage() {
//   const { id } = useParams();
//   const { data: product, isLoading, isError } = useProduct(id as string);
//   const { data: products = [] } = useProducts();
//   const [quantity, setQuantity] = useState(1);


//   const [selectedImage, setSelectedImage] = useState<string | undefined>(
//     undefined
//   );

//   // Set default image when product loads
//   useEffect(() => {
//     if (product && product.images && product.images.length > 0) {
//       setSelectedImage(product.images[0]);
//     }
//   }, [product]);

//   if (isLoading) {
//     return (
//       <div className="text-center py-20 text-xl text-gray-600">Loading...</div>
//     );
//   }

//   if (isError || !product) {
//     return (
//       <div className="text-center py-20 text-xl text-gray-600">
//         Product not found
//       </div>
//     );
//   }


//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12">
//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Image Section */}
//         <div className="space-y-4">
//           <div className="max-w-4xl mx-auto w-full">
//             <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow group">
//               <Image
//                 src={selectedImage || "/placeholder.svg"}
//                 alt={product.name}
//                 fill
//                 className="object-contain w-full h-full p-4 group-hover:scale-105 transition-transform duration-500"
//                 priority
//               />
//               {product.badge && (
//                 <Badge className="absolute top-4 left-4 bg-red-500">
//                   {product.badge}
//                 </Badge>
//               )}
//             </div>
//           </div>

//           {/* Thumbnails */}
//           <div className="flex gap-3 overflow-x-auto">
//             {product.images?.map((img, index) => (
//               <div
//                 key={index}
//                 onClick={() => setSelectedImage(img)}
//                 className={`w-20 h-20 rounded-lg overflow-hidden border cursor-pointer ${
//                   selectedImage === img ? "border-gray-500" : "border-gray-200"
//                 }`}
//               >
//                 <Image
//                   src={img}
//                   alt={`Preview ${index}`}
//                   width={80}
//                   height={80}
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="space-y-6">
//           <div className="flex items-center gap-3 flex-wrap">
//             <h1 className="text-3xl font-bold">{product.name}</h1>

//             {product.inStock ? (
//               <Badge className="bg-green-100 text-green-700 border border-green-400 px-3 py-1 text-sm font-medium flex items-center gap-1">
//                 <Check className="w-4 h-4" />
//                 In Stock
//               </Badge>
//             ) : (
//               <Badge
//                 variant="destructive"
//                 className="px-3 py-1 text-sm font-medium"
//               >
//                 Out of Stock
//               </Badge>
//             )}
//           </div>

//           <div className="flex items-center gap-2">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 className={`w-5 h-5 ${
//                   i < Math.floor(product.rating)
//                     ? "fill-yellow-400 text-yellow-400"
//                     : "text-gray-300"
//                 }`}
//               />
//             ))}
//             <span className="text-gray-600">({product.reviews} reviews)</span>
//           </div>

//           <div className="flex items-center gap-3 text-2xl font-bold">
//             <span>${product.price}</span>
//             {product.originalPrice && (
//               <>
//                 <span className="text-lg line-through text-gray-500">
//                   ${product.originalPrice}
//                 </span>
//                 <Badge variant="destructive">% OFF</Badge>
//               </>
//             )}
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Description</h3>
//             <p className="text-gray-700">{product.description}</p>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold mb-2">Key Features</h3>
//             <ul className="list-disc list-inside text-gray-700 space-y-1">
//               {product.features.map((f, i) => (
//                 <li key={i}>{f}</li>
//               ))}
//             </ul>
//           </div>

//           <div className="flex items-center flex-wrap gap-4 mt-6">
//             {/* Quantity Selector */}
//             <div className="flex items-center px-3 py-2 gap-4">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
//               >
//                 -
//               </Button>
//               <span className="text-lg font-medium w-6 text-center">
//                 {quantity}
//               </span>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => setQuantity((prev) => prev + 1)}
//               >
//                 +
//               </Button>
//             </div>

//             {/* Add to Cart Button */}
//             <div>
//               <Button
//                 disabled={!product.inStock}
//                 className="w-full sm:w-auto text-lg px-6 py-5"
//               >
//                 <ShoppingCart className="mr-2 w-5 h-5" />
//                 Add to Cart – ${product.price}
//               </Button>
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-4 pt-4 border-t">
//             <div className="text-center">
//               <Truck className="w-6 h-6 mx-auto text-blue-500 mb-2" />
//               <div className="font-semibold text-sm">Free Shipping</div>
//               <div className="text-xs text-gray-500">On orders over $50</div>
//             </div>
//             <div className="text-center">
//               <RotateCcw className="w-6 h-6 mx-auto text-green-500 mb-2" />
//               <div className="font-semibold text-sm">30-Day Returns</div>
//               <div className="text-xs text-gray-500">No questions asked</div>
//             </div>
//             <div className="text-center">
//               <Shield className="w-6 h-6 mx-auto text-purple-500 mb-2" />
//               <div className="font-semibold text-sm">2-Year Warranty</div>
//               <div className="text-xs text-gray-500">Full protection</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Related Products */}
//       <div className="max-w-7xl mx-auto px-4 mt-20">
//         <h1 className="text-3xl font-bold my-6">Related Products</h1>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {products
//             .filter(
//               (p) => p.category === product.category && p.id !== product.id
//             )
//             .slice(0, 6)
//             .map((related) => (
//               <Card
//                 key={related.id}
//                 className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden h-full flex flex-col justify-between"
//               >
//                 <div className="relative">
//                   <div className="relative h-56 overflow-hidden">
//                     <Image
//                       src={related.images?.[0] || "/placeholder.svg"}
//                       alt={related.name}
//                       fill
//                       className="object-cover group-hover:scale-105 transition-transform duration-300"
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />
//                     {related.badge && (
//                       <Badge className="absolute top-3 left-3 bg-red-500">
//                         {related.badge}
//                       </Badge>
//                     )}
//                     {!related.inStock && (
//                       <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                         <Badge
//                           variant="destructive"
//                           className="text-lg px-4 py-2"
//                         >
//                           Out of Stock
//                         </Badge>
//                       </div>
//                     )}
//                   </div>

//                   <CardContent className="p-4">
//                     <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
//                       {related.name}
//                     </h3>

//                     <div className="flex items-center gap-1 mb-2">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${
//                             i < Math.floor(related.rating)
//                               ? "fill-yellow-400 text-yellow-400"
//                               : "text-gray-300"
//                           }`}
//                         />
//                       ))}
//                       <span className="text-sm text-gray-600 ml-1">
//                         ({related.reviews})
//                       </span>
//                     </div>

//                     <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                       {related.description}
//                     </p>

//                     <div className="flex flex-wrap gap-1 mb-3">
//                       {related.features.slice(0, 3).map((feature, index) => (
//                         <Badge
//                           key={index}
//                           variant="outline"
//                           className="text-xs"
//                         >
//                           {feature}
//                         </Badge>
//                       ))}
//                       {related.features.length > 3 && (
//                         <Badge variant="outline" className="text-xs">
//                           +{related.features.length - 3} more
//                         </Badge>
//                       )}
//                     </div>

//                     <div className="flex items-center gap-2 mb-2">
//                       <span className="text-2xl font-bold text-gray-900">
//                         ${related.price}
//                       </span>
//                       {related.originalPrice && (
//                         <span className="text-lg text-gray-500 line-through">
//                           ${related.originalPrice}
//                         </span>
//                       )}
//                     </div>
//                   </CardContent>
//                 </div>

//                 <div className="px-2 pb-4 flex flex-col mt-auto">
//                   <Link href={`/products/${related.id}`} className="w-full">
//                     <Button variant="default" className="w-full">
//                       View More
//                     </Button>
//                   </Link>
//                 </div>
//               </Card>
//             ))}
//         </div>
//       </div>





//     </div>
//   );
// }






// // git add .

// //git commit -m "first commit"

// // git push -u origin main









// // // app/checkout/page.tsx
// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
// // import { createOrder } from "@/lib/store/slices/orderSlice";
// // import { clearCart } from "@/lib/store/slices/cartSlice";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// // import {
// //   CreditCard,
// //   Truck,
// //   Shield,
// //   ArrowLeft,
// //   Lock,

// // } from "lucide-react";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { toast } from "sonner";

// // export default function CheckoutPage() {
// //   const router = useRouter();
// //   const dispatch = useAppDispatch();
// //   const { items, total, itemCount } = useAppSelector((state) => state.cart);
// //   const { loading } = useAppSelector((state) => state.order);

// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     phone: "",
// //     address: "",
// //     city: "",
// //     state: "",
// //     zipCode: "",
// //     country: "United States",
// //     paymentMethod: "credit_card",
// //   });

// //   const [errors, setErrors] = useState<{[key: string]: string}>({});

// //   const shipping = total > 50 ? 0 : 9.99;
// //   const tax = total * 0.08;
// //   const finalTotal = total + shipping + tax;

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));

// //     // Clear error when user starts typing
// //     if (errors[name]) {
// //       setErrors(prev => ({
// //         ...prev,
// //         [name]: ""
// //       }));
// //     }
// //   };

// //   const validateForm = () => {
// //     const newErrors: {[key: string]: string} = {};

// //     if (!formData.firstName) newErrors.firstName = "First name is required";
// //     if (!formData.lastName) newErrors.lastName = "Last name is required";
// //     if (!formData.email) newErrors.email = "Email is required";
// //     if (!formData.phone) newErrors.phone = "Phone number is required";
// //     if (!formData.address) newErrors.address = "Address is required";
// //     if (!formData.city) newErrors.city = "City is required";
// //     if (!formData.state) newErrors.state = "State is required";
// //     if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";

// //     // Email validation
// //     if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
// //       newErrors.email = "Please enter a valid email address";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (!validateForm()) {
// //       toast.error("Please fill in all required fields");
// //       return;
// //     }

// //     if (items.length === 0) {
// //       toast.error("Your cart is empty");
// //       return;
// //     }

// //     try {
// //       const orderData = {
// //         items,
// //         subtotal: total,
// //         tax,
// //         shipping,
// //         total: finalTotal,
// //         shippingAddress: {
// //           firstName: formData.firstName,
// //           lastName: formData.lastName,
// //           email: formData.email,
// //           phone: formData.phone,
// //           address: formData.address,
// //           city: formData.city,
// //           state: formData.state,
// //           zipCode: formData.zipCode,
// //           country: formData.country,
// //         },
// //         paymentMethod: formData.paymentMethod,
// //       };

// //       const result = await dispatch(createOrder(orderData)).unwrap();

// //       // Clear cart after successful order
// //       dispatch(clearCart());

// //       toast.success("Order placed successfully!");
// //       router.push(`/order-confirmation/${result.id}`);
// //     } catch (error) {
// //       console.error("Order creation failed:", error);
// //       toast.error("Failed to place order. Please try again.");
// //     }
// //   };

// //   if (items.length === 0) {
// //     return (
// //       <div className="max-w-7xl mx-auto px-4 py-12">
// //         <div className="text-center py-20">
// //           <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
// //           <p className="text-gray-600 mb-8">
// //             Add some items to your cart before proceeding to checkout.
// //           </p>
// //           <Link href="/products">
// //             <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
// //               <ArrowLeft className="w-5 h-5 mr-2" />
// //               Continue Shopping
// //             </Button>
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-12">
// //       {/* Header */}
// //       <div className="flex items-center gap-4 mb-8">
// //         <Link href="/cart">
// //           <Button variant="outline" size="sm">
// //             <ArrowLeft className="w-4 h-4 mr-2" />
// //             Back to Cart
// //           </Button>
// //         </Link>
// //         <div>
// //           <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
// //           <p className="text-gray-600">Complete your order</p>
// //         </div>
// //       </div>

// //       <form onSubmit={handleSubmit}>
// //         <div className="grid lg:grid-cols-2 gap-8">
// //           {/* Left Column - Forms */}
// //           <div className="space-y-6">
// //             {/* Shipping Information */}
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2">
// //                   <Truck className="w-5 h-5" />
// //                   Shipping Information
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <Label htmlFor="firstName">First Name *</Label>
// //                     <Input
// //                       id="firstName"
// //                       name="firstName"
// //                       value={formData.firstName}
// //                       onChange={handleInputChange}
// //                       className={errors.firstName ? "border-red-500" : ""}
// //                     />
// //                     {errors.firstName && (
// //                       <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
// //                     )}
// //                   </div>
// //                   <div>
// //                     <Label htmlFor="lastName">Last Name *</Label>
// //                     <Input
// //                       id="lastName"
// //                       name="lastName"
// //                       value={formData.lastName}
// //                       onChange={handleInputChange}
// //                       className={errors.lastName ? "border-red-500" : ""}
// //                     />
// //                     {errors.lastName && (
// //                       <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <Label htmlFor="email">Email *</Label>
// //                   <Input
// //                     id="email"
// //                     name="email"
// //                     type="email"
// //                     value={formData.email}
// //                     onChange={handleInputChange}
// //                     className={errors.email ? "border-red-500" : ""}
// //                   />
// //                   {errors.email && (
// //                     <p className="text-red-500 text-sm mt-1">{errors.email}</p>
// //                   )}
// //                 </div>

// //                 <div>
// //                   <Label htmlFor="phone">Phone Number *</Label>
// //                   <Input
// //                     id="phone"
// //                     name="phone"
// //                     type="tel"
// //                     value={formData.phone}
// //                     onChange={handleInputChange}
// //                     className={errors.phone ? "border-red-500" : ""}
// //                   />
// //                   {errors.phone && (
// //                     <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
// //                   )}
// //                 </div>

// //                 <div>
// //                   <Label htmlFor="address">Street Address *</Label>
// //                   <Input
// //                     id="address"
// //                     name="address"
// //                     value={formData.address}
// //                     onChange={handleInputChange}
// //                     className={errors.address ? "border-red-500" : ""}
// //                   />
// //                   {errors.address && (
// //                     <p className="text-red-500 text-sm mt-1">{errors.address}</p>
// //                   )}
// //                 </div>

// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <Label htmlFor="city">City *</Label>
// //                     <Input
// //                       id="city"
// //                       name="city"
// //                       value={formData.city}
// //                       onChange={handleInputChange}
// //                       className={errors.city ? "border-red-500" : ""}
// //                     />
// //                     {errors.city && (
// //                       <p className="text-red-500 text-sm mt-1">{errors.city}</p>
// //                     )}
// //                   </div>
// //                   <div>
// //                     <Label htmlFor="state">State *</Label>
// //                     <Input
// //                       id="state"
// //                       name="state"
// //                       value={formData.state}
// //                       onChange={handleInputChange}
// //                       className={errors.state ? "border-red-500" : ""}
// //                     />
// //                     {errors.state && (
// //                       <p className="text-red-500 text-sm mt-1">{errors.state}</p>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <Label htmlFor="zipCode">ZIP Code *</Label>
// //                   <Input
// //                     id="zipCode"
// //                     name="zipCode"
// //                     value={formData.zipCode}
// //                     onChange={handleInputChange}
// //                     className={errors.zipCode ? "border-red-500" : ""}
// //                   />
// //                   {errors.zipCode && (
// //                     <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
// //                   )}
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* Payment Method */}
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2">
// //                   <CreditCard className="w-5 h-5" />
// //                   Payment Method
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 <RadioGroup
// //                   value={formData.paymentMethod}
// //                   onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
// //                 >
// //                   <div className="flex items-center space-x-2 p-3 border rounded-lg">
// //                     <RadioGroupItem value="credit_card" id="credit_card" />
// //                     <Label htmlFor="credit_card" className="flex items-center gap-2 cursor-pointer">
// //                       <CreditCard className="w-4 h-4" />
// //                       Credit Card
// //                     </Label>
// //                   </div>
// //                   <div className="flex items-center space-x-2 p-3 border rounded-lg">
// //                     <RadioGroupItem value="paypal" id="paypal" />
// //                     <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
// //                   </div>
// //                   <div className="flex items-center space-x-2 p-3 border rounded-lg">
// //                     <RadioGroupItem value="apple_pay" id="apple_pay" />
// //                     <Label htmlFor="apple_pay" className="cursor-pointer">Apple Pay</Label>
// //                   </div>
// //                 </RadioGroup>
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {/* Right Column - Order Summary */}
// //           <div>
// //             <Card className="sticky top-6">
// //               <CardHeader>
// //                 <CardTitle>Order Summary</CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 {/* Order Items */}
// //                 <div className="space-y-3 mb-6">
// //                   {items.map((item) => (
// //                     <div key={item.id} className="flex items-center gap-3">
// //                       <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
// //                         <Image
// //                           src={item.image}
// //                           alt={item.name}
// //                           fill
// //                           className="object-cover"
// //                         />
// //                       </div>
// //                       <div className="flex-1 min-w-0">
// //                         <h4 className="font-medium text-sm truncate">{item.name}</h4>
// //                         <div className="flex items-center gap-2 text-xs text-gray-600">
// //                           <span>Qty: {item.quantity}</span>
// //                           <span>×</span>
// //                           <span>${item.price}</span>
// //                         </div>
// //                       </div>
// //                       <div className="text-sm font-medium">
// //                         ${(item.price * item.quantity).toFixed(2)}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>

// //                 {/* Price Breakdown */}
// //                 <div className="space-y-2 mb-6 pt-4 border-t">
// //                   <div className="flex justify-between text-sm">
// //                     <span>Subtotal ({itemCount} items)</span>
// //                     <span>${total.toFixed(2)}</span>
// //                   </div>
// //                   <div className="flex justify-between text-sm">
// //                     <span>Shipping</span>
// //                     <span>
// //                       {shipping === 0 ? (
// //                         <span className="text-green-600">Free</span>
// //                       ) : (
// //                         `$${shipping.toFixed(2)}`
// //                       )}
// //                     </span>
// //                   </div>
// //                   <div className="flex justify-between text-sm">
// //                     <span>Tax</span>
// //                     <span>${tax.toFixed(2)}</span>
// //                   </div>
// //                   <div className="flex justify-between text-lg font-bold pt-2 border-t">
// //                     <span>Total</span>
// //                     <span>${finalTotal.toFixed(2)}</span>
// //                   </div>
// //                 </div>

// //                 {/* Place Order Button */}
// //                 <Button
// //                   type="submit"
// //                   className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
// //                   disabled={loading}
// //                 >
// //                   {loading ? (
// //                     "Processing..."
// //                   ) : (
// //                     <>
// //                       <Lock className="w-5 h-5 mr-2" />
// //                       Place Order - ${finalTotal.toFixed(2)}
// //                     </>
// //                   )}
// //                 </Button>

// //                 {/* Security Badge */}
// //                 <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
// //                   <Shield className="w-4 h-4 text-green-500" />
// //                   <span>Secure SSL Encrypted Checkout</span>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// // app/checkout/page.tsx


// // // app/checkout/page.tsx
// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
// // import { createOrder } from "@/lib/store/slices/orderSlice";
// // import { clearCart } from "@/lib/store/slices/cartSlice";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// // import {
// //   CreditCard,
// //   Truck,
// //   Shield,
// //   ArrowLeft,
// //   Lock,

// // } from "lucide-react";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { toast } from "sonner";

// // export default function CheckoutPage() {
// //   const router = useRouter();
// //   const dispatch = useAppDispatch();
// //   const { items, total, itemCount } = useAppSelector((state) => state.cart);
// //   const { loading } = useAppSelector((state) => state.order);

// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     phone: "",
// //     address: "",
// //     city: "",
// //     state: "",
// //     zipCode: "",
// //     country: "United States",
// //     paymentMethod: "credit_card",
// //   });

// //   const [errors, setErrors] = useState<{[key: string]: string}>({});

// //   const shipping = total > 50 ? 0 : 9.99;
// //   const tax = total * 0.08;
// //   const finalTotal = total + shipping + tax;

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));

// //     // Clear error when user starts typing
// //     if (errors[name]) {
// //       setErrors(prev => ({
// //         ...prev,
// //         [name]: ""
// //       }));
// //     }
// //   };

// //   const validateForm = () => {
// //     const newErrors: {[key: string]: string} = {};

// //     if (!formData.firstName) newErrors.firstName = "First name is required";
// //     if (!formData.lastName) newErrors.lastName = "Last name is required";
// //     if (!formData.email) newErrors.email = "Email is required";
// //     if (!formData.phone) newErrors.phone = "Phone number is required";
// //     if (!formData.address) newErrors.address = "Address is required";
// //     if (!formData.city) newErrors.city = "City is required";
// //     if (!formData.state) newErrors.state = "State is required";
// //     if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";

// //     // Email validation
// //     if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
// //       newErrors.email = "Please enter a valid email address";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (!validateForm()) {
// //       toast.error("Please fill in all required fields");
// //       return;
// //     }

// //     if (items.length === 0) {
// //       toast.error("Your cart is empty");
// //       return;
// //     }

// //     try {
// //       const orderData = {
// //         items,
// //         subtotal: total,
// //         tax,
// //         shipping,
// //         total: finalTotal,
// //         shippingAddress: {
// //           firstName: formData.firstName,
// //           lastName: formData.lastName,
// //           email: formData.email,
// //           phone: formData.phone,
// //           address: formData.address,
// //           city: formData.city,
// //           state: formData.state,
// //           zipCode: formData.zipCode,
// //           country: formData.country,
// //         },
// //         paymentMethod: formData.paymentMethod,
// //       };

// //       const result = await dispatch(createOrder(orderData)).unwrap();

// //       // Clear cart after successful order
// //       dispatch(clearCart());

// //       toast.success("Order placed successfully!");
// //       router.push(`/order-confirmation/${result.id}`);
// //     } catch (error) {
// //       console.error("Order creation failed:", error);
// //       toast.error("Failed to place order. Please try again.");
// //     }
// //   };

// //   if (items.length === 0) {
// //     return (
// //       <div className="max-w-7xl mx-auto px-4 py-12">
// //         <div className="text-center py-20">
// //           <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
// //           <p className="text-gray-600 mb-8">
// //             Add some items to your cart before proceeding to checkout.
// //           </p>
// //           <Link href="/products">
// //             <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
// //               <ArrowLeft className="w-5 h-5 mr-2" />
// //               Continue Shopping
// //             </Button>
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-12">
// //       {/* Header */}
// //       <div className="flex items-center gap-4 mb-8">
// //         <Link href="/cart">
// //           <Button variant="outline" size="sm">
// //             <ArrowLeft className="w-4 h-4 mr-2" />
// //             Back to Cart
// //           </Button>
// //         </Link>
// //         <div>
// //           <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
// //           <p className="text-gray-600">Complete your order</p>
// //         </div>
// //       </div>

// //       <form onSubmit={handleSubmit}>
// //         <div className="grid lg:grid-cols-2 gap-8">
// //           {/* Left Column - Forms */}
// //           <div className="space-y-6">
// //             {/* Shipping Information */}
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2">
// //                   <Truck className="w-5 h-5" />
// //                   Shipping Information
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <Label htmlFor="firstName">First Name *</Label>
// //                     <Input
// //                       id="firstName"
// //                       name="firstName"
// //                       value={formData.firstName}
// //                       onChange={handleInputChange}
// //                       className={errors.firstName ? "border-red-500" : ""}
// //                     />
// //                     {errors.firstName && (
// //                       <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
// //                     )}
// //                   </div>
// //                   <div>
// //                     <Label htmlFor="lastName">Last Name *</Label>
// //                     <Input
// //                       id="lastName"
// //                       name="lastName"
// //                       value={formData.lastName}
// //                       onChange={handleInputChange}
// //                       className={errors.lastName ? "border-red-500" : ""}
// //                     />
// //                     {errors.lastName && (
// //                       <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <Label htmlFor="email">Email *</Label>
// //                   <Input
// //                     id="email"
// //                     name="email"
// //                     type="email"
// //                     value={formData.email}
// //                     onChange={handleInputChange}
// //                     className={errors.email ? "border-red-500" : ""}
// //                   />
// //                   {errors.email && (
// //                     <p className="text-red-500 text-sm mt-1">{errors.email}</p>
// //                   )}
// //                 </div>

// //                 <div>
// //                   <Label htmlFor="phone">Phone Number *</Label>
// //                   <Input
// //                     id="phone"
// //                     name="phone"
// //                     type="tel"
// //                     value={formData.phone}
// //                     onChange={handleInputChange}
// //                     className={errors.phone ? "border-red-500" : ""}
// //                   />
// //                   {errors.phone && (
// //                     <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
// //                   )}
// //                 </div>

// //                 <div>
// //                   <Label htmlFor="address">Street Address *</Label>
// //                   <Input
// //                     id="address"
// //                     name="address"
// //                     value={formData.address}
// //                     onChange={handleInputChange}
// //                     className={errors.address ? "border-red-500" : ""}
// //                   />
// //                   {errors.address && (
// //                     <p className="text-red-500 text-sm mt-1">{errors.address}</p>
// //                   )}
// //                 </div>

// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <Label htmlFor="city">City *</Label>
// //                     <Input
// //                       id="city"
// //                       name="city"
// //                       value={formData.city}
// //                       onChange={handleInputChange}
// //                       className={errors.city ? "border-red-500" : ""}
// //                     />
// //                     {errors.city && (
// //                       <p className="text-red-500 text-sm mt-1">{errors.city}</p>
// //                     )}
// //                   </div>
// //                   <div>
// //                     <Label htmlFor="state">State *</Label>
// //                     <Input
// //                       id="state"
// //                       name="state"
// //                       value={formData.state}
// //                       onChange={handleInputChange}
// //                       className={errors.state ? "border-red-500" : ""}
// //                     />
// //                     {errors.state && (
// //                       <p className="text-red-500 text-sm mt-1">{errors.state}</p>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <Label htmlFor="zipCode">ZIP Code *</Label>
// //                   <Input
// //                     id="zipCode"
// //                     name="zipCode"
// //                     value={formData.zipCode}
// //                     onChange={handleInputChange}
// //                     className={errors.zipCode ? "border-red-500" : ""}
// //                   />
// //                   {errors.zipCode && (
// //                     <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
// //                   )}
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* Payment Method */}
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2">
// //                   <CreditCard className="w-5 h-5" />
// //                   Payment Method
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 <RadioGroup
// //                   value={formData.paymentMethod}
// //                   onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
// //                 >
// //                   <div className="flex items-center space-x-2 p-3 border rounded-lg">
// //                     <RadioGroupItem value="credit_card" id="credit_card" />
// //                     <Label htmlFor="credit_card" className="flex items-center gap-2 cursor-pointer">
// //                       <CreditCard className="w-4 h-4" />
// //                       Credit Card
// //                     </Label>
// //                   </div>
// //                   <div className="flex items-center space-x-2 p-3 border rounded-lg">
// //                     <RadioGroupItem value="paypal" id="paypal" />
// //                     <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
// //                   </div>
// //                   <div className="flex items-center space-x-2 p-3 border rounded-lg">
// //                     <RadioGroupItem value="apple_pay" id="apple_pay" />
// //                     <Label htmlFor="apple_pay" className="cursor-pointer">Apple Pay</Label>
// //                   </div>
// //                 </RadioGroup>
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {/* Right Column - Order Summary */}
// //           <div>
// //             <Card className="sticky top-6">
// //               <CardHeader>
// //                 <CardTitle>Order Summary</CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 {/* Order Items */}
// //                 <div className="space-y-3 mb-6">
// //                   {items.map((item) => (
// //                     <div key={item.id} className="flex items-center gap-3">
// //                       <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
// //                         <Image
// //                           src={item.image}
// //                           alt={item.name}
// //                           fill
// //                           className="object-cover"
// //                         />
// //                       </div>
// //                       <div className="flex-1 min-w-0">
// //                         <h4 className="font-medium text-sm truncate">{item.name}</h4>
// //                         <div className="flex items-center gap-2 text-xs text-gray-600">
// //                           <span>Qty: {item.quantity}</span>
// //                           <span>×</span>
// //                           <span>${item.price}</span>
// //                         </div>
// //                       </div>
// //                       <div className="text-sm font-medium">
// //                         ${(item.price * item.quantity).toFixed(2)}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>

// //                 {/* Price Breakdown */}
// //                 <div className="space-y-2 mb-6 pt-4 border-t">
// //                   <div className="flex justify-between text-sm">
// //                     <span>Subtotal ({itemCount} items)</span>
// //                     <span>${total.toFixed(2)}</span>
// //                   </div>
// //                   <div className="flex justify-between text-sm">
// //                     <span>Shipping</span>
// //                     <span>
// //                       {shipping === 0 ? (
// //                         <span className="text-green-600">Free</span>
// //                       ) : (
// //                         `$${shipping.toFixed(2)}`
// //                       )}
// //                     </span>
// //                   </div>
// //                   <div className="flex justify-between text-sm">
// //                     <span>Tax</span>
// //                     <span>${tax.toFixed(2)}</span>
// //                   </div>
// //                   <div className="flex justify-between text-lg font-bold pt-2 border-t">
// //                     <span>Total</span>
// //                     <span>${finalTotal.toFixed(2)}</span>
// //                   </div>
// //                 </div>

// //                 {/* Place Order Button */}
// //                 <Button
// //                   type="submit"
// //                   className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
// //                   disabled={loading}
// //                 >
// //                   {loading ? (
// //                     "Processing..."
// //                   ) : (
// //                     <>
// //                       <Lock className="w-5 h-5 mr-2" />
// //                       Place Order - ${finalTotal.toFixed(2)}
// //                     </>
// //                   )}
// //                 </Button>

// //                 {/* Security Badge */}
// //                 <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
// //                   <Shield className="w-4 h-4 text-green-500" />
// //                   <span>Secure SSL Encrypted Checkout</span>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// // app/checkout/page.tsx

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

//         // Clear cart after successful order
//         dispatch(clearCart());

//         toast.success("Order placed successfully!");
//         router.push(`/order-confirmation/${result.id}`);
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

