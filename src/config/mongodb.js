import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        // tick logo before the message to indicate success
        console.log('✅ MongoDB connected successfully');  
    }catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        throw error;
    }
};

export default connectDB;