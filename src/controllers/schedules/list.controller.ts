import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import { listScheduleService } from "../../services/schedules/listSchedule.services";

export const listSchedulesController = async (
  request: Request,
  response: Response
) => {
  try {
    const { id } = request.params;
    const list = await listScheduleService(id);
    return response.status(200).json(list);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};
