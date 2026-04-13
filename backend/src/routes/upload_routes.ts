import { Router } from "express";
import { getSignature, saveVideo } from "../controllers/upload_controller";
import { authmiddleware } from "../middleware/auth_middleware";
import { getvideoController } from "../controllers/getvideo_controller";


const uploadRouter = Router();

uploadRouter.get("/upload/signature",authmiddleware, getSignature);

uploadRouter.post("/upload", authmiddleware, saveVideo)

export default uploadRouter;