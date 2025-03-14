import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn =await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // 1 is for failure, 0 is for success
    }
}

export default connectDB;