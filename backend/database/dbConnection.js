require('dotenv').config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    console.log("Using cached MongoDB connection");
    return client;
  }

  try {
    await client.connect();
    isConnected = true;
    console.log("Connected to MongoDB successfully!");
    return client;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

module.exports = { connectDB, client };
