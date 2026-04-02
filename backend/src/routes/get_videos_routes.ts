import { Router } from "express";
import { getvideoController } from "../controllers/getvideo_controller";

const getVideosRouter = Router();

getVideosRouter.get("/", getvideoController)

export default getVideosRouter;