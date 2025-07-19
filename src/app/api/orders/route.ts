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

//////////NEW

// app/api/orders/route.ts


// import { NextRequest, NextResponse } from "next/server";
// import Order from "@/models/Order"; // আপনার Mongoose Order মডেল
// import { v4 as uuidv4 } from "uuid"; // ইউনিক ID তৈরির জন্য
// import { connectMongoDB } from "@/lib/mongodb"; // MongoDB সংযোগের জন্য
// import User from "@/models/User"; // আপনার Mongoose User মডেল
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // NextAuth অথেন্টিকেশনের জন্য
// import { getServerSession } from "next-auth"; // সার্ভার সাইডে সেশন পাওয়ার জন্য
// import { Order as OrderType } from "@/types/types"; // আপনার কাস্টম Order Type আমদানি করা হয়েছে
// import { Types } from "mongoose"; // Mongoose এর ObjectId টাইপের জন্য

// // --- GET - নির্দিষ্ট ব্যবহারকারীর অর্ডার আনুন অথবা অ্যাডমিন সব অর্ডার দেখতে পারে ---
// export async function GET() {
//   // এখানে 'request: NextRequest' এর প্রয়োজন নেই কারণ আমরা কোনো request body বা URL parameters ব্যবহার করছি না
//   try {
//     await connectMongoDB(); // MongoDB এর সাথে সংযোগ স্থাপন করুন

//     const session = await getServerSession(authOptions); // বর্তমান ব্যবহারকারীর সেশন পান
//     if (!session?.user?.email) {
//       return NextResponse.json(
//         { error: "অননুমোদিত: ব্যবহারকারী লগইন করেননি" },
//         { status: 401 }
//       );
//     }

//     const user = await User.findOne({ email: session.user.email }); // ইমেল দিয়ে ব্যবহারকারীকে খুঁজুন
//     if (!user) {
//       return NextResponse.json(
//         { error: "ব্যবহারকারী খুঁজে পাওয়া যায়নি" },
//         { status: 404 }
//       );
//     }

//     let query: { user?: Types.ObjectId } = {}; // অর্ডারের জন্য একটি কোয়েরি অবজেক্ট তৈরি করুন

//     // যদি ব্যবহারকারী অ্যাডমিন হন, তবে সব অর্ডার দেখান
//     // ধরে নিচ্ছি আপনার User মডেলে 'role' ফিল্ড আছে (যেমন: 'user', 'admin')
//     if (user.role === "admin") {
//       query = {}; // অ্যাডমিন সব অর্ডার দেখতে পারে, তাই কোয়েরি খালি থাকবে
//     } else {
//       // সাধারণ ব্যবহারকারী শুধু তাদের নিজেদের অর্ডার দেখতে পারে
//       query = { user: user._id }; // ব্যবহারকারীর ObjectId দিয়ে ফিল্টার করুন
//     }

//     // কোয়েরি অনুসারে অর্ডারগুলো খুঁজুন এবং নতুন থেকে পুরানো ক্রমে সাজান
//     const orders = await Order.find(query).sort({ createdAt: -1 });

//     // ক্লায়েন্ট-সাইডের জন্য অর্ডার ডেটা ফরম্যাট করুন
//     const formattedOrders: OrderType[] = orders.map((order) => ({
//       id: order.id,
//       userId: order.user.toString(), // Mongoose ObjectId কে string এ রূপান্তর করুন
//       items: order.items,
//       subtotal: order.subtotal,
//       tax: order.tax,
//       shipping: order.shipping,
//       total: order.total,
//       shippingAddress: order.shippingAddress,
//       paymentMethod: order.paymentMethod,
//       paymentStatus: order.paymentStatus,
//       transactionId: order.transactionId,
//       status: order.status,
//       createdAt: order.createdAt.toISOString(), // Date অবজেক্টকে ISO string এ রূপান্তর করুন
//       updatedAt: order.updatedAt.toISOString(), // Date অবজেক্টকে ISO string এ রূপান্তর করুন
//       discount: order.discount,
//       estimatedDelivery: order.estimatedDelivery,
//     }));

//     return NextResponse.json(formattedOrders); // ফরম্যাট করা অর্ডারগুলো JSON হিসাবে ফেরত দিন
//   } catch (error: unknown) {
//     // যেকোনো অপ্রত্যাশিত ত্রুটি হ্যান্ডেল করুন
//     console.error("অর্ডার আনতে ত্রুটি:", error);
//     return NextResponse.json(
//       {
//         error: "অর্ডার আনতে ব্যর্থ হয়েছে",
//         message: error instanceof Error ? error.message : String(error),
//       },
//       { status: 500 } // সার্ভার ত্রুটি কোড
//     );
//   }
// }

// // --- POST - নতুন অর্ডার তৈরি করুন ---
// export async function POST(request: NextRequest) {
//   // POST রিকোয়েস্টের জন্য 'request: NextRequest' প্রয়োজন কারণ আমরা request body থেকে ডেটা পড়ব
//   try {
//     await connectMongoDB();

//     const session = await getServerSession(authOptions);
//     if (!session?.user?.email) {
//       return NextResponse.json({ error: "অননুমোদিত" }, { status: 401 });
//     }

//     const user = await User.findOne({ email: session.user.email });
//     if (!user) {
//       return NextResponse.json(
//         { error: "ব্যবহারকারী খুঁজে পাওয়া যায়নি" },
//         { status: 404 }
//       );
//     }

//     // রিকোয়েস্ট বডি থেকে অর্ডার ডেটা পার্স করুন
//     // 'Omit' ব্যবহার করে ক্লায়েন্ট-জেনারেটেড ID, userId, timestamps এবং status বাদ দেওয়া হয়েছে
//     const body: Omit<
//       OrderType,
//       "id" | "userId" | "createdAt" | "updatedAt" | "status"
//     > & {
//       transactionId?: string;
//       paymentStatus: OrderType["paymentStatus"];
//     } = await request.json();

//     const {
//       items,
//       subtotal,
//       tax,
//       shipping,
//       total,
//       discount,
//       shippingAddress,
//       paymentMethod,
//       paymentStatus,
//       transactionId,
//       estimatedDelivery,
//     } = body;

//     // সার্ভার-সাইড ভ্যালিডেশন: প্রয়োজনীয় ফিল্ডগুলো আছে কিনা চেক করুন
//     if (
//       !items ||
//       items.length === 0 ||
//       !shippingAddress ||
//       typeof total !== "number" ||
//       total <= 0
//     ) {
//       return NextResponse.json(
//         { error: "অর্ডার ডেটা অনুপস্থিত বা অবৈধ" },
//         { status: 400 }
//       );
//     }

//     // ডুপ্লিকেট অর্ডার তৈরি প্রতিরোধ করুন যদি transactionId থাকে
//     if (transactionId) {
//       const existingOrder = await Order.findOne({
//         transactionId: transactionId,
//       });
//       if (existingOrder) {
//         console.warn(
//           `transactionId: ${transactionId} সহ ডুপ্লিকেট অর্ডার তৈরির চেষ্টা করা হয়েছে। বিদ্যমান অর্ডার ফেরত দেওয়া হচ্ছে।`
//         );
//         const formattedExistingOrder: OrderType = {
//           id: existingOrder.id,
//           userId: existingOrder.user.toString(),
//           items: existingOrder.items,
//           subtotal: existingOrder.subtotal,
//           tax: existingOrder.tax,
//           shipping: existingOrder.shipping,
//           total: existingOrder.total,
//           shippingAddress: existingOrder.shippingAddress,
//           paymentMethod: existingOrder.paymentMethod,
//           paymentStatus: existingOrder.paymentStatus,
//           transactionId: existingOrder.transactionId,
//           status: existingOrder.status,
//           createdAt: existingOrder.createdAt.toISOString(),
//           updatedAt: existingOrder.updatedAt.toISOString(),
//           discount: existingOrder.discount,
//           estimatedDelivery: existingOrder.estimatedDelivery,
//         };
//         return NextResponse.json(formattedExistingOrder, { status: 200 }); // 200 OK কারণ অর্ডারটি ইতিমধ্যেই আছে
//       }
//     }

//     // নতুন অর্ডার অবজেক্ট তৈরি করুন
//     const newOrder = {
//       id: uuidv4(), // ইউনিক অর্ডার ID তৈরি করুন
//       user: user._id, // বর্তমান ব্যবহারকারীর ObjectId
//       items: items.map((item) => ({
//         // প্রতিটি কার্ট আইটেমকে MongoDB স্কিমা অনুযায়ী ম্যাপ করুন
//         id: item.id,
//         name: item.name,
//         price: item.price,
//         originalPrice: item.originalPrice,
//         image: item.image,
//         quantity: item.quantity,
//         inStock: item.inStock,
//         category: item.category,
//       })),
//       subtotal: subtotal,
//       tax: tax,
//       shipping: shipping,
//       total: total,
//       discount: discount,
//       shippingAddress: shippingAddress,
//       paymentMethod: paymentMethod,
//       paymentStatus: paymentStatus || "pending", // যদি না দেওয়া হয়, ডিফল্ট 'pending'
//       transactionId: transactionId,
//       estimatedDelivery: estimatedDelivery,
//       status: "pending", // প্রাথমিক অর্ডারের অবস্থা 'pending'
//     };

//     const order = new Order(newOrder); // Mongoose মডেল ব্যবহার করে নতুন অর্ডার তৈরি করুন
//     await order.save(); // অর্ডার ডেটাবেসে সংরক্ষণ করুন

//     // ক্লায়েন্টকে ফেরত পাঠানোর জন্য ফরম্যাট করা অর্ডার অবজেক্ট
//     const createdOrder: OrderType = {
//       id: order.id,
//       userId: order.user.toString(),
//       items: order.items,
//       subtotal: order.subtotal,
//       tax: order.tax,
//       shipping: order.shipping,
//       total: order.total,
//       discount: order.discount,
//       shippingAddress: order.shippingAddress,
//       paymentMethod: order.paymentMethod,
//       paymentStatus: order.paymentStatus,
//       transactionId: order.transactionId,
//       estimatedDelivery: order.estimatedDelivery,
//       status: order.status,
//       createdAt: order.createdAt.toISOString(),
//       updatedAt: order.updatedAt.toISOString(),
//     };

//     return NextResponse.json(createdOrder, { status: 201 }); // সফলভাবে তৈরি হয়েছে (201 Created)
//   } catch (error: unknown) {
//     console.error("অর্ডার তৈরি করতে ত্রুটি:", error);
//     return NextResponse.json(
//       {
//         error: "অর্ডার তৈরি করতে ব্যর্থ হয়েছে",
//         message: error instanceof Error ? error.message : String(error),
//       },
//       { status: 500 }
//     );
//   }
// }

// // --- PATCH - অর্ডার স্ট্যাটাস আপডেট করুন (সাধারণত অ্যাডমিনদের জন্য) ---
// export async function PATCH(request: NextRequest) {
//   // PATCH রিকোয়েস্টের জন্য 'request: NextRequest' প্রয়োজন
//   try {
//     await connectMongoDB();
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.email) {
//       return NextResponse.json({ error: "অননুমোদিত" }, { status: 401 });
//     }

//     const user = await User.findOne({ email: session.user.email });
//     // শুধুমাত্র অ্যাডমিনরা অর্ডার স্ট্যাটাস আপডেট করতে পারবে
//     if (!user || user.role !== "admin") {
//       return NextResponse.json(
//         {
//           error:
//             "অনুমোদিত নয়: শুধুমাত্র অ্যাডমিন অর্ডার স্ট্যাটাস আপডেট করতে পারে",
//         },
//         { status: 403 }
//       );
//     }

//     const { id, status } = await request.json(); // রিকোয়েস্ট বডি থেকে আইডি এবং স্ট্যাটাস পান

//     if (!id || !status) {
//       return NextResponse.json(
//         { error: "অর্ডার আইডি এবং স্ট্যাটাস প্রয়োজন" },
//         { status: 400 }
//       );
//     }

//     // অর্ডার খুঁজুন এবং স্ট্যাটাস আপডেট করুন
//     const updatedOrder = await Order.findOneAndUpdate(
//       { id: id }, // অর্ডারের ইউনিক ID দিয়ে খুঁজুন
//       { $set: { status: status, updatedAt: new Date() } }, // স্ট্যাটাস এবং আপডেট করা তারিখ সেট করুন
//       { new: true } // আপডেটেড ডকুমেন্ট ফেরত দিন
//     );

//     if (!updatedOrder) {
//       return NextResponse.json(
//         { error: "অর্ডার খুঁজে পাওয়া যায়নি" },
//         { status: 404 }
//       );
//     }

//     // ক্লায়েন্টকে ফেরত পাঠানোর জন্য ফরম্যাট করা আপডেটেড অর্ডার অবজেক্ট
//     const formattedUpdatedOrder: OrderType = {
//       id: updatedOrder.id,
//       userId: updatedOrder.user.toString(),
//       items: updatedOrder.items,
//       subtotal: updatedOrder.subtotal,
//       tax: updatedOrder.tax,
//       shipping: updatedOrder.shipping,
//       total: updatedOrder.total,
//       shippingAddress: updatedOrder.shippingAddress,
//       paymentMethod: updatedOrder.paymentMethod,
//       paymentStatus: updatedOrder.paymentStatus,
//       transactionId: updatedOrder.transactionId,
//       status: updatedOrder.status,
//       createdAt: updatedOrder.createdAt.toISOString(),
//       updatedAt: updatedOrder.updatedAt.toISOString(),
//       discount: updatedOrder.discount,
//       estimatedDelivery: updatedOrder.estimatedDelivery,
//     };

//     return NextResponse.json(formattedUpdatedOrder); // আপডেটেড অর্ডার ফেরত দিন
//   } catch (error: unknown) {
//     console.error("অর্ডার স্ট্যাটাস আপডেট করতে ত্রুটি:", error);
//     return NextResponse.json(
//       {
//         error: "অর্ডার স্ট্যাটাস আপডেট করতে ব্যর্থ হয়েছে",
//         message: error instanceof Error ? error.message : String(error),
//       },
//       { status: 500 }
//     );
//   }
// }
