import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { ICategoryRequest } from "../../interfaces/categories";
import { handleError } from "../../middlewares/errors.mid";
import { createCategorieService } from "../../services/categories/createCategories.services";

export const createCategorieController = async (
  request: Request,
  response: Response
) => {
  try {
    const { name }: ICategoryRequest = request.body;
    const category = await createCategorieService({ name });

    return response.status(201).json(category);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};
