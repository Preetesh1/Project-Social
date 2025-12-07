import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import postRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(postRoutes)
app.use(userRoutes)

const start = async() => {

    const connectDB = await mongoose.connect("mongodb+srv://preeteshsharma10:Hzz9BgsWTo8H0Mnd@menteeconnect.l4jujxn.mongodb.net/")

    app.listen(9080, () => {
        console.log("Server is running on port 9080")
    })
}

start();