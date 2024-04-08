import express from "express";
// import your routes
import userRoute from "./routes/users.js"
const app = express();

app.use(express.json());
// use your routes

app.use('/users', userRoute);


const port = process.env.PORT ?? 5000;
app.listen(port, ()=>{
console.log(`server started successfully on port ${port} `);
});