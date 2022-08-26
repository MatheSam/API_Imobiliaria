import { Router } from "express";
import { createSchedulesController } from "../../controllers/schedules/create.controller";
import { listSchedulesController } from "../../controllers/schedules/list.controller";
import { authToken } from "../../middlewares/authToken.middleware";
import { isAdm } from "../../middlewares/isAdm.middleware";

export const schedulesRouter = Router();

schedulesRouter.post("", authToken, createSchedulesController);
schedulesRouter.get(
  "/properties/:id",
  authToken,
  isAdm,
  listSchedulesController
);
