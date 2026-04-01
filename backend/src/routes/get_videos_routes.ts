import { Router } from "express";
import { getvideosservice } from "../services/get_videos_service";

const getVideosRouter = Router();

getVideosRouter.get("/", getvideosservice)

export default getVideosRouter;