import express from "express";
import 'dotenv/config'
import cors from 'cors'
import authRouter from "./src/routes/auth_routes";
import { errorHandler } from "./src/utils/ErrorHandler";
import cookieParser from 'cookie-parser'
import getVideosRouter from "./src/routes/get_videos_routes";
import uploadRouter from "./src/routes/upload_routes";
const PORT = process.env.PORT;

const app = express()

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))
app.use(express.json());
app.use(cookieParser())

app.use("/v1", authRouter);
app.use("/v1", getVideosRouter);
app.use("/v1", uploadRouter);

app.use(errorHandler);

app.listen(PORT ,() => {

    console.log(`server is running on port ${PORT}`);
})
