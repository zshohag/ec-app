// lib/clientPromise.ts
import { MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
if (!uri) throw new Error("Missing MongoDB URI");

const client = new MongoClient(uri);
const clientPromise = client.connect();

export default clientPromise;
