import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/users.js";
import verifyAuth from "./middleware/verifyAuth.js";
import postRoute from "./routes/post.js";
const app = express();

app.use(express.json());
app.use("/users", userRoute);
app.use("/posts", verifyAuth , postRoute);

const port = process.env.PORT ?? 5000;
app.listen(port, async () => {
    try{
    await mongoose.connect(`mongodb://127.0.0.1/seeMeeApp`);
    console.log("MongoDB connected successfully");
    console.log(`server started successfully on port ${port} `);
    }catch(error){
        console.log("Error trying to connect to mongo");
    }
});
