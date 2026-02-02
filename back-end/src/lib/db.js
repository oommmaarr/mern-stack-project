import mongoose from 'mongoose';

export const connectDB = async()=>{
    try{
      const connection = await mongoose.connect(process.env.MONGOOSE_URI)
      console.log(`MongoDB connected: ${connection.connection.host}`);
    }catch(error){
        console.error('MongoDB connection failed:', error);
    }
}