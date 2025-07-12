import { MongoClient, Db, ServerApiVersion } from "mongodb";

let client: MongoClient; // ✅ explicitly typed
let db: Db;               // ✅ explicitly typed

export const connectDB = async (): Promise<Db> => {
  if (db) return db;

  try {
    const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

    if (!uri) {
      throw new Error("MongoDB URI not defined in environment variables.");
    }

    if (!client) {
      client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
      await client.connect();
    }

    db = client.db("ecpay_db"); // your DB name
    console.log("✅ Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB.");
  }
};
