import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nova_b2b_db';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`[Database Notice] Local MongoDB is not active (${error.message}). Running in Resilient In-Memory Mode with complete NOVA industrial dataset.`);
    return false;
  }
};

export const getDBStatus = () => ({
  connected: isConnected,
  mode: isConnected ? 'MongoDB Live' : 'Resilient In-Memory Demo Mode',
});
