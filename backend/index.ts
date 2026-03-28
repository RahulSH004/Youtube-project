import express from "express";
import 'dotenv/config'
import cors from 'cors'
import authRouter from "./src/auth/auth_routes";
import { errorHandler } from "./src/utils/ErrorHandler";
const PORT = process.env.PORT;

const app = express()

app.use(cors({
    origin: "http://localhost:5000",
    credentials: true
}))
app.use(express.json());

app.use("/api", authRouter);

app.use(errorHandler);

app.listen(PORT ,() => {

    console.log(`server is running on port ${PORT}`);
})
