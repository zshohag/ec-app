// import { MongoClient, Db, ServerApiVersion } from "mongodb";

// let client: MongoClient;
// let db: Db;

// export const connectDB = async (): Promise<Db> => {
//   if (db) return db;

//   try {
//     const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

//     if (!uri) {
//       throw new Error("MongoDB URI not defined in environment variables.");
//     }

//     if (!client) {
//       client = new MongoClient(uri, {
//         serverApi: {
//           version: ServerApiVersion.v1,
//           strict: true,
//           deprecationErrors: true,
//         },
//       });
//       await client.connect();
//     }

//     db = client.db("ecpay_db"); // your DB name
//     console.log("✅ Connected to MongoDB");
//     return db;
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error);
//     throw new Error("Failed to connect to MongoDB.");
//   }
// };



import { MongoClient, Db, ServerApiVersion } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export const connectDB = async (): Promise<Db> => {
  if (cachedDb) return cachedDb;

  const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

  if (!uri) {
    throw new Error("❌ MongoDB URI is missing in environment variables.");
  }

  try {
    if (!cachedClient) {
      cachedClient = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
      await cachedClient.connect();
      console.log("✅ MongoClient connected.");
    }

    cachedDb = cachedClient.db("ecpay_db"); // 👉 আপনার DB নাম
    console.log("✅ Using database: ecpay_db");
    return cachedDb;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw new Error("Failed to connect to MongoDB.");
  }
};
