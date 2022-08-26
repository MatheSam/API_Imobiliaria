import { Router } from "express";
import { createPropertiesController } from "../../controllers/properties/create.controller";
import { listPropertiesController } from "../../controllers/properties/list.controller";
import { authToken } from "../../middlewares/authToken.middleware";
import { isAdm } from "../../middlewares/isAdm.middleware";

export const propertiesRouter = Router();

propertiesRouter.post("", authToken, isAdm, createPropertiesController);
propertiesRouter.get("", listPropertiesController);
