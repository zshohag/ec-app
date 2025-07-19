// // app/api/orders/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import Order from '@/models/Order';
// import { v4 as uuidv4 } from 'uuid';
// import { connectMongoDB } from "@/lib/mongodb";

// // GET - Fetch all orders
// export async function GET() {
//   try {
//     await connectMongoDB();
//     const orders = await Order.find({}).sort({ createdAt: -1 });
//     return NextResponse.json(orders);
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch orders' },
//       { status: 500 }
//     );
//   }
// }

// // POST - Create new order
// export async function POST(request: NextRequest) {
//   try {
//     await connectMongoDB();
    
//     const body = await request.json();
//     const { items, subtotal, tax, shipping, shippingAddress, paymentMethod } = body;
    
//     const total = subtotal + tax + shipping;
    
//     const orderData = {
//       id: uuidv4(),
//       items,
//       total,
//       subtotal,
//       tax,
//       shipping,
//       shippingAddress,
//       paymentMethod,
//       status: 'pending',
//     };
    
//     const order = new Order(orderData);
//     await order.save();
    
//     return NextResponse.json(order, { status: 201 });
//   } catch (error) {
//     console.error('Error creating order:', error);
//     return NextResponse.json(
//       { error: 'Failed to create order' },
//       { status: 500 }
//     );
//   }
// }

// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Order from '@/models/Order';
import { v4 as uuidv4 } from 'uuid';
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from 'next-auth';


// GET - Fetch all orders
export async function GET() {
  try {
    await connectMongoDB();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST - Create new order
export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const { items, subtotal, tax, shipping, shippingAddress, paymentMethod } = body;

    const total = subtotal + tax + shipping;

    const orderData = {
      id: uuidv4(),
      user: user._id, // ✅ Associate order with user
      items,
      total,
      subtotal,
      tax,
      shipping,
      shippingAddress,
      paymentMethod,
      status: "pending",
    };

    const order = new Order(orderData);
    await order.save();

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
