import { instanceToPlain } from "class-transformer";
import { json, Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { IUser, IUserRequest } from "../../interfaces/users";
import { handleError } from "../../middlewares/errors.mid";
import { createUserService } from "../../services/user/createUser.service";

export const createUserController = async (
  request: Request,
  response: Response
) => {
  try {
    const { email, isAdm, name, password }: IUserRequest = request.body;

    const user = await createUserService({ email, isAdm, name, password });

    return response.status(201).json(instanceToPlain(user));
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};
