import { Router } from "express";
import { getvideoController, videobyidController } from "../controllers/getvideo_controller";

const getVideosRouter = Router();

getVideosRouter.get("/", getvideoController)
getVideosRouter.get("/video/:id", videobyidController)

export default getVideosRouter;