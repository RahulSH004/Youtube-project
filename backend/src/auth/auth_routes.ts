import { Router } from "express";
import { validate } from "./auth_middleware";
import { signinschema, signupschema } from "./auth_schema";
import { signupController, signinController } from "./auth_controller";

const authRouter = Router();

authRouter.post("/signup", validate(signupschema), signupController)
authRouter.post("/signin", validate(signinschema), signinController);

export default authRouter;