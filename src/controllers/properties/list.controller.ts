import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import { listPropertiesServices } from "../../services/properties/listProperties.service";

export const listPropertiesController = async (
  request: Request,
  response: Response
) => {
  try {
    const properties = await listPropertiesServices();
    return response.json(properties);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};
