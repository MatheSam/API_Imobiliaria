import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { handleError } from "./errors.mid";

export const isAdm = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { isAdm } = request.user;

    if (!isAdm) {
      throw new AppError("User is not admin", 403);
    }

    next();
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};
