import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import { listCategoriesServices } from "../../services/categories/listCategories.services";

export const listCategorieController = async (
  request: Request,
  response: Response
) => {
  try {
    const categories = await listCategoriesServices();
    return response.json(categories);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};
