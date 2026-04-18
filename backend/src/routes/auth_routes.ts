import { Router } from "express";
import { authmiddleware, validate } from "../middleware/auth_middleware";
import { signinschema, signupschema } from "../schema/auth_schema";
import { signupController, signinController } from "../controllers/auth_controller";

const authRouter = Router();

authRouter.post("/auth/signup", validate(signupschema), signupController)
authRouter.post("/auth/signin", validate(signinschema), signinController);
authRouter.get("/me", authmiddleware, (req, res) => {
    res.json({ user: req.user })
});


export default authRouter;