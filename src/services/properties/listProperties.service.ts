import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";

export const listPropertiesServices = async (): Promise<Properties[]> => {
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const properties = await propertiesRepository.find();

  return properties;
};
