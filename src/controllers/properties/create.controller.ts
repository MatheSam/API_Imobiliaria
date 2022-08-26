import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { IPropertyRequest } from "../../interfaces/properties";
import { handleError } from "../../middlewares/errors.mid";
import { createPropertiesService } from "../../services/properties/createProperties.services";

export const createPropertiesController = async (
  request: Request,
  response: Response
) => {
  try {
    const {
      address: { city, district, state, zipCode, number },
      categoryId,
      size,
      value,
    }: IPropertyRequest = request.body;

    const propertie = await createPropertiesService({
      categoryId,
      size,
      value,
      address: { city, district, state, zipCode, number },
    });

    return response.status(201).json(propertie);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};
