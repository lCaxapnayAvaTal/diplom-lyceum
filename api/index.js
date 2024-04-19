import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import cors from 'cors'

const PORT = process.env.PORT || 8080

const app = express();
app.use(express.json())
app.use(cors());
dotenv.config()

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('MongoDb is connectedd');
    }).catch(err => {
        console.log(err);
    })

app.listen(PORT, () => {
    console.log(`Server is runninng on port ${PORT}`);
})

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Inrernal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })

})