import dotenv from "dotenv";
dotenv.config();

export default()=>{
    return {
        JWT_SECRET: process.env.JWT_SECRET,
        CLOUD_NAME: process.env.CLOUD_NAME,
        CLOUD_API_KEY: process.env.CLOUD_API_KEY,
        CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
    }
}