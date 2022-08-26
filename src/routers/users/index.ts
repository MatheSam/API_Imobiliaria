import { Router } from "express";
import { createUserController } from "../../controllers/users/create.controller";
import { deleteUserController } from "../../controllers/users/delete.controller";
import { listUserController } from "../../controllers/users/list.controller";
import { authToken } from "../../middlewares/authToken.middleware";
import { isAdm } from "../../middlewares/isAdm.middleware";

export const usersRouter = Router();

usersRouter.post("", createUserController);
usersRouter.get("", authToken, isAdm, listUserController);
usersRouter.delete("/:id", authToken, isAdm, deleteUserController);
