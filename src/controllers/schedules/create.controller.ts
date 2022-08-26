import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { IScheduleRequest } from "../../interfaces/schedules";
import { handleError } from "../../middlewares/errors.mid";
import { createSchedulesServices } from "../../services/schedules/createSchedules.services";

export const createSchedulesController = async (
  request: Request,
  response: Response
) => {
  try {
    const { id } = request.user;
    const userId = id;
    const { date, hour, propertyId }: IScheduleRequest = request.body;
    const schedule = await createSchedulesServices({
      date,
      hour,
      propertyId,
      userId,
    });
    return response.status(201).json({ message: "Schedule created" });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};
