import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { Schedules } from "../../entities/schedules.entity";
import { AppError } from "../../errors/AppError";

export const listScheduleService = async (id: string) => {
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const properties = await propertiesRepository.findOne({
    relations: {
      schedules: true,
    },
    where: {
      id,
    },
  });

  if (!properties) {
    throw new AppError("Property not found", 404);
  }

  return properties;
};
