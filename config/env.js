import dotenv from "dotenv";
dotenv.config();

export default()=>{
    return {
        JWT_SECRET: process.env.JWT_SECRET,

    }
}