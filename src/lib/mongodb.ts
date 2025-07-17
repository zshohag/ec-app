// import mongoose from "mongoose";

// export const connectMongoDB = async () => {
//   try {
//     const uri = process.env.MONGODB_URI;
//     if (!uri) {
//       throw new Error("❌ MONGODB_URI not set in environment variables");
//     }
//     await mongoose.connect(uri);
//     console.log("Connected to MONGODB");
//   } catch (error) {
//     console.log("Erro connecting to database: ", error);
//   }
// };

// /src/lib/mongodb.ts
import mongoose from "mongoose";

let isConnected = false;

export const connectMongoDB = async () => {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("❌ MONGODB_URI not set");

  try {
    await mongoose.connect(uri, {
      dbName: "shophub", // Explicitly set database name here!
    });
    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};
