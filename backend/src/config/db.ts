import mongoose from "mongoose"; import {env} from "./env.js";
export const connectDB=async()=>{await mongoose.connect(env.MONGO_URI,{dbName:env.MONGO_DB_NAME}); console.log(`MongoDB connected: ${env.MONGO_DB_NAME}`)};
export const disconnectDB=()=>mongoose.disconnect();
