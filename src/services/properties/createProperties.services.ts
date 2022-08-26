import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/AppError";
import { IPropertyRequest } from "../../interfaces/properties/index";

export const createPropertiesService = async ({
  address: { city, district, state, zipCode, number },
  categoryId,
  size,
  value,
}: IPropertyRequest): Promise<Properties> => {
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const categoryRepository = AppDataSource.getRepository(Categories);
  const addressRepository = AppDataSource.getRepository(Addresses);

  const alreadyExits = await addressRepository.findOneBy({ zipCode });

  if (alreadyExits?.number === number) {
    throw new AppError("Address already Exists", 400);
  }

  if (state.length > 2) {
    throw new AppError("Invalid state", 400);
  }

  if (zipCode.length > 8) {
    throw new AppError("Invalid zip code", 400);
  }

  const addressCurr = addressRepository.create({
    district,
    zipCode,
    number,
    city,
    state,
  });

  await addressRepository.save(addressCurr);

  const categoryCurr = await categoryRepository.findOneBy({ id: categoryId });

  if (!categoryCurr) {
    throw new AppError("Category not found", 404);
  }

  const properties = propertiesRepository.create({
    value,
    createdAt: new Date(),
    updatedAt: new Date(),
    size,
    sold: false,
    address: addressCurr,
    category: {
      id: categoryCurr?.id,
      name: categoryCurr?.name,
    },
  });

  await propertiesRepository.save(properties);

  return properties;
};
