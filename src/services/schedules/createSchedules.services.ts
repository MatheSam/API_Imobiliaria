import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { Schedules } from "../../entities/schedules.entity";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IScheduleRequest } from "../../interfaces/schedules";

export const createSchedulesServices = async ({
  date,
  hour,
  propertyId,
  userId,
}: IScheduleRequest): Promise<void> => {
  const schedulesRepository = AppDataSource.getRepository(Schedules);
  const propertyRepository = AppDataSource.getRepository(Properties);
  const usersRepository = AppDataSource.getRepository(Users);

  const properties = await propertyRepository.findOneBy({ id: propertyId });
  const users = await usersRepository.findOneBy({ id: userId });

  if (!properties) {
    throw new AppError("Property not found", 404);
  }

  const propertiScheduled = await schedulesRepository.find({
    relations: { properties: true },
    where: {
      date,
      hour,
    },
  });

  if (propertiScheduled.length > 0) {
    throw new AppError("User schedule already exists", 400);
  }

  if (+hour.split(":")[0] < 8 || +hour.split(":")[0] > 18) {
    throw new AppError("Invalid hour", 400);
  }

  if (new Date(date).getDay() == 0 || new Date(date).getDay() == 6) {
    throw new AppError("Invalid Date", 400);
  }

  await schedulesRepository.save({
    date: date,
    hour: hour,
    users: users!,
    properties: properties,
  });
};
