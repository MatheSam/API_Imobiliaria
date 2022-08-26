import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import { listUserService } from "../../services/user/listUser.service";

export const listUserController = async (
  request: Request,
  response: Response
) => {
  try {
    const users = await listUserService();
    return response.json(instanceToPlain(users));
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};
