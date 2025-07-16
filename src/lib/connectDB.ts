import { MongoClient, Db, ServerApiVersion } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export const connectDB = async (): Promise<Db> => {
  if (cachedDb) return cachedDb;

  // Remove NEXT_PUBLIC_ prefix for security
  const uri = process.env.MONGODB_URI;

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

    cachedDb = cachedClient.db("ecpay_database");

    console.log("✅ Using database: ecpay_database");
    return cachedDb;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw new Error("Failed to connect to MongoDB.");
  }
};