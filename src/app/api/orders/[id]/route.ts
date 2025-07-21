// import { NextRequest, NextResponse } from 'next/server';
// import Order from '@/models/Order';
// import { connectMongoDB } from "@/lib/mongodb";

// // GET - Fetch single order
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectMongoDB();
//     const order = await Order.findOne({ id: params.id });

//     if (!order) {
//       return NextResponse.json(
//         { error: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(order);
//   } catch (error) {
//     console.error('Error fetching order:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch order' },
//       { status: 500 }
//     );
//   }
// }

// // PATCH - Update order status
// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectMongoDB();

//     const body = await request.json();
//     const { status } = body;

//     const order = await Order.findOneAndUpdate(
//       { id: params.id },
//       { status },
//       { new: true }
//     );

//     if (!order) {
//       return NextResponse.json(
//         { error: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(order);
//   } catch (error) {
//     console.error('Error updating order:', error);
//     return NextResponse.json(
//       { error: 'Failed to update order' },
//       { status: 500 }
//     );
//   }
// }

// // DELETE - Delete order
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectMongoDB();

//     const order = await Order.findOneAndDelete({ id: params.id });

//     if (!order) {
//       return NextResponse.json(
//         { error: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ message: 'Order deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting order:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete order' },
//       { status: 500 }
//     );
//   }
// }

//NEW TRY PREVIOUS PROBLEM  ALSO THIS

// import { NextRequest, NextResponse } from 'next/server';
// import Order from '@/models/Order';
// import { connectMongoDB } from "@/lib/mongodb";

// // GET - Fetch single order
// export async function GET(
//   request: NextRequest,
//   context: { params: { id: string } } // Corrected type for the second argument
// ) {
//   try {
//     await connectMongoDB();
//     const { id } = context.params; // Destructure id from context.params
//     const order = await Order.findOne({ _id: id }); // Assuming your MongoDB ID field is _id, not id

//     if (!order) {
//       return NextResponse.json(
//         { error: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(order);
//   } catch (error) {
//     console.error('Error fetching order:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch order' },
//       { status: 500 }
//     );
//   }
// }

// // PATCH - Update order status
// export async function PATCH(
//   request: NextRequest,
//   context: { params: { id: string } } // Corrected type for the second argument
// ) {
//   try {
//     await connectMongoDB();

//     const { id } = context.params; // Destructure id from context.params
//     const body = await request.json();
//     const { status } = body;

//     const order = await Order.findOneAndUpdate(
//       { _id: id }, // Assuming your MongoDB ID field is _id, not id
//       { status },
//       { new: true }
//     );

//     if (!order) {
//       return NextResponse.json(
//         { error: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(order);
//   } catch (error) {
//     console.error('Error updating order:', error);
//     return NextResponse.json(
//       { error: 'Failed to update order' },
//       { status: 500 }
//     );
//   }
// }

// // DELETE - Delete order
// export async function DELETE(
//   request: NextRequest,
//   context: { params: { id: string } } // Corrected type for the second argument
// ) {
//   try {
//     await connectMongoDB();

//     const { id } = context.params; // Destructure id from context.params
//     const order = await Order.findOneAndDelete({ _id: id }); // Assuming your MongoDB ID field is _id, not id

//     if (!order) {
//       return NextResponse.json(
//         { error: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ message: 'Order deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting order:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete order' },
//       { status: 500 }
//     );
//   }
// }

///////////////222222  NOT WORKING

// import { NextRequest, NextResponse } from 'next/server';
// import Order from '@/models/Order';
// import { connectMongoDB } from "@/lib/mongodb";

// // GET - Fetch single order
// export async function GET(
//   request: NextRequest,
//   // Corrected: Destructure params directly from the second argument,
//   // and type the entire destructured object.
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectMongoDB();
//     const { id } = params; // Access id directly from params
//     const order = await Order.findOne({ _id: id });

//     if (!order) {
//       return NextResponse.json(
//         { error: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(order);
//   } catch (error) {
//     console.error('Error fetching order:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch order' },
//       { status: 500 }
//     );
//   }
// }

// // PATCH - Update order status
// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string } } // Corrected type
// ) {
//   try {
//     await connectMongoDB();

//     const { id } = params; // Access id directly from params
//     const body = await request.json();
//     const { status } = body;

//     const order = await Order.findOneAndUpdate(
//       { _id: id },
//       { status },
//       { new: true }
//     );

//     if (!order) {
//       return NextResponse.json(
//         { error: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(order);
//   } catch (error) {
//     console.error('Error updating order:', error);
//     return NextResponse.json(
//       { error: 'Failed to update order' },
//       { status: 500 }
//     );
//   }
// }

// // DELETE - Delete order
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } } // Corrected type
// ) {
//   try {
//     await connectMongoDB();

//     const { id } = params; // Access id directly from params
//     const order = await Order.findOneAndDelete({ _id: id });

//     if (!order) {
//       return NextResponse.json(
//         { error: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ message: 'Order deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting order:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete order' },
//       { status: 500 }
//     );
//   }
// }

///////////33

// import { NextRequest, NextResponse } from 'next/server';
// import Order from '@/models/Order';
// import { connectMongoDB } from "@/lib/mongodb";

// // Define a type for the context object to ensure proper typing of params
// interface Context {
//   params: {
//     id: string;
//   };
// }

// // GET - Fetch single order
// export async function GET(
//   request: NextRequest,
//   context: Context // Use the defined Context interface
// ) {
//   try {
//     await connectMongoDB();
//     const { id } = context.params; // Access id from context.params
//     const order = await Order.findOne({ _id: id });

//     if (!order) {
//       return NextResponse.json(
//         { error: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(order);
//   } catch (error) {
//     console.error('Error fetching order:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch order' },
//       { status: 500 }
//     );
//   }
// }

// // PATCH - Update order status
// export async function PATCH(
//   request: NextRequest,
//   context: Context // Use the defined Context interface
// ) {
//   try {
//     await connectMongoDB();

//     const { id } = context.params; // Access id from context.params
//     const body = await request.json();
//     const { status } = body;

//     const order = await Order.findOneAndUpdate(
//       { _id: id },
//       { status },
//       { new: true }
//     );

//     if (!order) {
//       return NextResponse.json(
//         { error: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(order);
//   } catch (error) {
//     console.error('Error updating order:', error);
//     return NextResponse.json(
//       { error: 'Failed to update order' },
//       { status: 500 }
//     );
//   }
// }

// // DELETE - Delete order
// export async function DELETE(
//   request: NextRequest,
//   context: Context // Use the defined Context interface
// ) {
//   try {
//     await connectMongoDB();

//     const { id } = context.params; // Access id from context.params
//     const order = await Order.findOneAndDelete({ _id: id });

//     if (!order) {
//       return NextResponse.json(
//         { error: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ message: 'Order deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting order:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete order' },
//       { status: 500 }
//     );
//   }
// }

///44

import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectMongoDB } from "@/lib/mongodb";

// Define a type for the context object with Promise-based params
interface Context {
  params: Promise<{
    id: string;
  }>;
}

// GET - Fetch single order
export async function GET(request: NextRequest, context: Context) {
  try {
    await connectMongoDB();
    const { id } = await context.params; // Await the params Promise
    const order = await Order.findOne({ _id: id });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

// PATCH - Update order status
export async function PATCH(request: NextRequest, context: Context) {
  try {
    await connectMongoDB();

    const { id } = await context.params; // Await the params Promise
    const body = await request.json();
    const { status } = body;

    const order = await Order.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}

// DELETE - Delete order
export async function DELETE(request: NextRequest, context: Context) {
  try {
    await connectMongoDB();

    const { id } = await context.params; // Await the params Promise
    const order = await Order.findOneAndDelete({ _id: id });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
}
