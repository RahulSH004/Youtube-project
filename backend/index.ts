import express from "express";
import 'dotenv/config'
import authRouter from "./src/auth/auth_routes";
import { errorHandler } from "./src/utils/ErrorHandler";
const PORT = process.env.PORT;

const app = express()

app.use("/api", authRouter);

app.use(errorHandler);

app.listen(PORT ,() => {

    console.log(`server is running on port ${PORT}`);
})
