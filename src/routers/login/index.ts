import { Router } from "express";
import { loginController } from "../../controllers/login/token.controller";

export const loginRouter = Router();

loginRouter.post("", loginController);
