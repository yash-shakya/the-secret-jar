import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(){
  if(connection.isConnected){
    console.log("Already connected to the database");
    return;
  }
  
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }
  
  try {
    console.log('Attempting to connect to MongoDB...');
    const db = await mongoose.connect(process.env.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to the database successfully");
    return db;
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err; // Re-throw to be handled by the API route
  }
}

export default dbConnect;