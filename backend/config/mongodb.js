import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URL}/HeaiPoint`,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.log(`❌ Error: ${error.message}`)
        process.exit(1)
    }
}
export default connectDB