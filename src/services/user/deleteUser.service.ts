import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";

export const deleteUserService = async (id: string): Promise<void> => {
  const usersRepository = AppDataSource.getRepository(Users);

  const user = await usersRepository.findOneBy({ id });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.isActive) {
    throw new AppError("Inactive user", 400);
  }

  user.isActive = false;

  await usersRepository.save(user);
};
