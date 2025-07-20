// export default function ManageOrdersPage() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold">Manage Orders</h1>
//     </div>
//   );
// }


'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { AlertCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Order, CartItem } from '@/types/types';
import { formatCurrency } from '@/lib/utils';

export default function ManageOrdersPage() {
  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['adminOrders'],
    queryFn: async () => {
      const res = await fetch('/api/orders/admin');
      if (!res.ok) throw new Error('Failed to fetch admin orders');
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (isError || !orders) {
    return (
      <div className="flex flex-col items-center justify-center h-60 text-red-500">
        <AlertCircle className="w-6 h-6 mb-2" />
        <p>Failed to load admin orders.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">All Orders (Admin View)</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order: Order) => (
            <div
              key={order.id}
              className="border rounded-xl p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-gray-700">Order ID:</p>
                  <p className="text-sm text-gray-500">{order.id}</p>
                  <p className="text-sm text-gray-500">
                    User: {order.shippingAddress?.email}
                  </p>
                </div>
                <div className="text-sm text-right text-gray-600">
                  <p>Status: <span className="font-medium">{order.status}</span></p>
                  {order.createdAt && (
                    <p>{format(new Date(order.createdAt), 'PPP')}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {order.items.map((item: CartItem) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border rounded-md p-2"
                  >
                    <Image
                      src={item.images?.[0]}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Price: {formatCurrency(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-end">
                <p className="font-semibold text-lg">
                  Total: {formatCurrency(order.total)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
