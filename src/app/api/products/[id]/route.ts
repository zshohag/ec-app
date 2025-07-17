import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   try {
//     await connectMongoDB();
//     const product = await Product.findById(params.id);
//     if (!product) {
//       return NextResponse.json({ message: "Product not found" }, { status: 404 });
//     }
//     return NextResponse.json(product);
//   } catch (err) {
//     return NextResponse.json({ message: "Error fetching product", error: err }, { status: 500 });
//   }
// }

// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectMongoDB();

//     // Await the params before accessing properties
//     const { id } = await params;
//     const product = await Product.findById(id);

//     if (!product) {
//       return NextResponse.json({ message: "Product not found" }, { status: 404 });
//     }

//     return NextResponse.json(product);
//   } catch (err) {
//     return NextResponse.json({ message: "Error fetching product", error: err }, { status: 500 });
//   }
// }

// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     console.log('=== API Route Called ===');
//     console.log('Request URL:', req.url);

//     // Test 1: Can we await params?
//     console.log('Awaiting params...');
//     const resolvedParams = await params;
//     console.log('Resolved params:', resolvedParams);

//     const { id } = resolvedParams;
//     console.log('Extracted ID:', id);

//     // Return success response
//     return NextResponse.json({
//       success: true,
//       id: id,
//       message: 'Route working correctly',
//       timestamp: new Date().toISOString()
//     });

//   } catch (error) {
//     console.error('=== ERROR IN API ROUTE ===');
//     console.error('Error:', error);
//     console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
//     console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');

//     return NextResponse.json({
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown error',
//       stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : '') : undefined
//     }, { status: 500 });
//   }
// }

// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     console.log('=== API Route Called ===');
//     console.log('Request URL:', req.url);

//     // Step 1: Test params (we know this works)
//     const { id } = await params;
//     console.log('✅ Params working - ID:', id);

//     // Step 2: Test MongoDB connection
//     console.log('🔌 Connecting to MongoDB...');
//     await connectMongoDB();
//     console.log('✅ MongoDB connected successfully');

//     // Step 3: Test if Product model exists
//     console.log('🔍 Testing Product model...');
//     console.log('Product model:', typeof Product);

//     // Step 4: Test a simple query first
//     console.log('📊 Testing simple query...');
//     const productCount = await Product.countDocuments();
//     console.log('✅ Total products in database:', productCount);

//     // Step 5: Test finding by ID
//     console.log('🔎 Searching for product with ID:', id);
//     const product = await Product.findById(id);
//     console.log('✅ Product found:', !!product);

//     if (!product) {
//       console.log('❌ Product not found for ID:', id);
//       return NextResponse.json(
//         { message: "Product not found", id: id, totalProducts: productCount },
//         { status: 404 }
//       );
//     }

//     console.log('✅ Product details:', {
//       id: product._id,
//       name: product.name,
//       price: product.price
//     });

//     return NextResponse.json(product);

//   } catch (error) {
//     console.error('❌ ERROR IN API ROUTE:');
//     console.error('Error type:', error?.constructor?.name);
//     console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
//     console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');

//     // More detailed error info
//     if (error instanceof Error) {
//       console.error('Error details:', {
//         name: error.name,
//         message: error.message,
//         stack: error.stack?.split('\n').slice(0, 5) // First 5 lines of stack
//       });
//     }

//     return NextResponse.json({
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown error',
//       errorType: error?.constructor?.name,
//       stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : '') : undefined
//     }, { status: 500 });
//   }
// }

// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     console.log('Received ID:', id);

//     await connectMongoDB();

//     // Validate ObjectId format
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       console.log('Invalid ObjectId format:', id);
//       return NextResponse.json(
//         { message: "Invalid product ID format. Expected a valid ObjectId." },
//         { status: 400 }
//       );
//     }

//     const product = await Product.findById(id);

//     if (!product) {
//       return NextResponse.json(
//         { message: "Product not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(product);

//   } catch (err) {
//     console.error('API Route Error:', err);
//     return NextResponse.json(
//       { message: "Error fetching product", error: err instanceof Error ? err.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("Received ID:", id);

    await connectMongoDB();
    console.log("✅ Connected to MongoDB");

    // Since your model uses a custom 'id' field (not _id), search by that field
    const product = await Product.findOne({ id: id });
    console.log("Product found:", !!product);

    if (!product) {
      console.log("Product not found for ID:", id);
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    console.log("✅ Returning product:", product.name);
    return NextResponse.json(product);
  } catch (err) {
    console.error("API Route Error:", err);
    return NextResponse.json(
      {
        message: "Error fetching product",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}









export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    await connectMongoDB();
    
    const updatedProduct = await Product.findOneAndUpdate(
      { id: id }, 
      body, 
      { new: true }
    );
    
    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json(updatedProduct);
  } catch (err) {
    console.error('PUT Error:', err);
    return NextResponse.json(
      { message: "Error updating product", error: err instanceof Error ? err.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await connectMongoDB();
    
    const deletedProduct = await Product.findOneAndDelete({ id: id });
    
    if (!deletedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error('DELETE Error:', err);
    return NextResponse.json(
      { message: "Error deleting product", error: err instanceof Error ? err.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}

// export async function PUT(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectMongoDB();
//     const body = await req.json();
//     const updatedProduct = await Product.findByIdAndUpdate(params.id, body, {
//       new: true,
//     });
//     if (!updatedProduct) {
//       return NextResponse.json(
//         { message: "Product not found" },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json(updatedProduct);
//   } catch (err) {
//     return NextResponse.json(
//       { message: "Error updating product", error: err },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectMongoDB();
//     const deletedProduct = await Product.findByIdAndDelete(params.id);
//     if (!deletedProduct) {
//       return NextResponse.json(
//         { message: "Product not found" },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json({ message: "Product deleted" });
//   } catch (err) {
//     return NextResponse.json(
//       { message: "Error deleting product", error: err },
//       { status: 500 }
//     );
//   }
// }




//////////////////////////////
// import { NextResponse } from "next/server";
// import { connectMongoDB } from "@/lib/mongodb";
// import Product from "@/models/Product";

// // GET: Get product by ID
// // export async function GET(
// //   req: Request,
// //   { params }: { params: { id: string } }
// // ) {
// //   try {
// //     await connectMongoDB();
// //     const product = await Product.findById(params.id);

// //     if (!product) {
// //       return NextResponse.json({ message: "Product not found" }, { status: 404 });
// //     }

// //     return NextResponse.json(product);
// //   } catch (error) {
// //     return NextResponse.json(
// //       { message: "Error fetching product", error },
// //       { status: 500 }
// //     );
// //   }
// // }

// export async function GET(
//   req: Request,
//   context: { params: { id: string } } | Promise<{ params: { id: string } }>
// ) {
//   try {
//     await connectMongoDB();

//     // Await context if it's a Promise
//     const { params } = await context; // <-- key fix here

//     const product = await Product.findById(params.id);

//     if (!product) {
//       return NextResponse.json(
//         { message: "Product not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(product);
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error fetching product", error },
//       { status: 500 }
//     );
//   }
// }

// // PUT: Update product by ID
// export async function PUT(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = await req.json();
//     await connectMongoDB();

//     const updated = await Product.findByIdAndUpdate(params.id, body, {
//       new: true,
//     });

//     if (!updated) {
//       return NextResponse.json(
//         { message: "Product not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(updated);
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error updating product", error },
//       { status: 500 }
//     );
//   }
// }

// // DELETE: Delete product by ID
// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectMongoDB();

//     const deleted = await Product.findByIdAndDelete(params.id);

//     if (!deleted) {
//       return NextResponse.json(
//         { message: "Product not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ message: "Product deleted successfully" });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error deleting product", error },
//       { status: 500 }
//     );
//   }
// }
