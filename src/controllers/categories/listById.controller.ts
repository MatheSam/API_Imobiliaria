import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import { listByIdServices } from "../../services/categories/listById.services";

export const listByIdController = async (
  request: Request,
  response: Response
) => {
  try {
    const { id } = request.params;
    const categories = await listByIdServices(id);
    return response.json(categories);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};
