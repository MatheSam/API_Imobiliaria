import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { IUserLogin } from "../../interfaces/users";
import { handleError } from "../../middlewares/errors.mid";
import { loginService } from "../../services/login/login.service";

export const loginController = async (request: Request, response: Response) => {
  try {
    const { email, password }: IUserLogin = request.body;
    const token = await loginService({ email, password });
    return response.json({ token });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};
