import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Connected to Mongo DB")
    } catch (error) {
        throw error
    }
};

// middlewares
app.use(cookieParser());
app.use(express.json()); // allow to send json formatted data 

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);

// error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Server Error";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage
    });
})


app.listen(8800, () => {
    connect();
    console.log("Connected to the backend server");
})

