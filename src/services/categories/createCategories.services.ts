import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/AppError";
import { ICategoryRequest } from "../../interfaces/categories";

export const createCategorieService = async ({
  name,
}: ICategoryRequest): Promise<ICategoryRequest> => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const alreadyExists = await categoryRepository.findOneBy({ name });

  if (alreadyExists) {
    throw new AppError("Category already exists", 400);
  }

  const category = {
    name,
  };

  await categoryRepository.save(category);

  return category;
};
