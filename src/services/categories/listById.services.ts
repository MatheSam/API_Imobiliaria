import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/AppError";

export const listByIdServices = async (id: string): Promise<Categories> => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const categories = await categoriesRepository.findOne({
    where: {
      id,
    },
    relations: {
      properties: true,
    },
  });

  if (!categories) {
    throw new AppError("Category not found", 404);
  }

  return categories;
};
