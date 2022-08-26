import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";

export const listUserService = async (): Promise<Users[]> => {
  const usersRepository = AppDataSource.getRepository(Users);

  const users = await usersRepository.find();

  return users;
};
