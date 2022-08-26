import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import { deleteUserService } from "../../services/user/deleteUser.service";

export const deleteUserController = async (
  request: Request,
  response: Response
) => {
  try {
    const { id } = request.params;
    const user = await deleteUserService(id);
    return response.status(204).json(user);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};
