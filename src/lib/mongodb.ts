
// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI!;
// if (!uri) throw new Error("❌ MONGODB_URI not set in .env file");

// const client = new MongoClient(uri);
// export const clientPromise = client.connect(); // ✅ Promise<MongoClient>


import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("❌ MONGODB_URI not set in environment variables");
    }
    await mongoose.connect(uri);
    console.log("Connected to MONGODB");
  } catch (error) {
    console.log("Erro connecting to database: ", error);
  }
};
