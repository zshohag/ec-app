// components/checkout/OrderSummaryCard.tsx
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { CartItem } from "@/types/types";

interface OrderSummaryCardProps {
  items: CartItem[];
  itemCount: number;
  total: number;
  shipping: number;
  tax: number;
  finalTotal: number;
  children: React.ReactNode; // For the payment button (Stripe or COD)
}

export default function OrderSummaryCard({
  items,
  itemCount,
  total,
  shipping,
  tax,
  finalTotal,
  children,
}: OrderSummaryCardProps) {
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Order Items */}
        <div className="space-y-3 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={item.images?.[0]}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>Qty: {item.quantity}</span>
                  <span>×</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              </div>
              <div className="text-sm font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
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
            <span>Tax (8%)</span> {/* Assuming 8% tax rate */}
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {children} {/* This is where the payment button will be rendered */}

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
          <Shield className="w-4 h-4 text-green-500" />
          <span>Secure SSL Encrypted Checkout</span>
        </div>
      </CardContent>
    </Card>
  );
}