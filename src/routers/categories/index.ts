import { Router } from "express";
import { createCategorieController } from "../../controllers/categories/create.controller";
import { listCategorieController } from "../../controllers/categories/list.controller";
import { listByIdController } from "../../controllers/categories/listById.controller";
import { authToken } from "../../middlewares/authToken.middleware";
import { isAdm } from "../../middlewares/isAdm.middleware";

export const categoriesRouter = Router();

categoriesRouter.post("", authToken, isAdm, createCategorieController);
categoriesRouter.get("", listCategorieController);
categoriesRouter.get("/:id/properties", listByIdController);
