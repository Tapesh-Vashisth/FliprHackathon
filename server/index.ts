import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

import placeRouter from "./routes/placeRoutes";
import userRouter from "./routes/userRoutes";
import addPlace from "./controllers/placesControllers/addPlace";

dotenv.config();

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(cors({
    origin:["http://localhost:3000"],
    methods:['POST','GET','HEAD','PUT','DELETE'],
    credentials: true
}))
app.use(cookieParser());

app.use('/api/user', userRouter)
app.post('/api/search', addPlace)

const port = process.env.PORT || 5500;

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@database.vxrvuo9.mongodb.net/`).then(() => {
    console.log("database connected");
    app.listen(port, () => {
        console.log(`server listening on port ${port}`)
    });
}).catch((err: any) => {
    console.log(err);
})
