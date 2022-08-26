import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { IUser, IUserRequest } from "../../interfaces/users";
import { v4 as uuid } from "uuid";
import { AppError } from "../../errors/AppError";

export const createUserService = async ({
  email,
  isAdm,
  name,
  password,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(Users);

  const alreadyExists = await userRepository.findOneBy({ email });

  if (alreadyExists) {
    throw new AppError("User already exits", 400);
  }

  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    email,
    isAdm,
    name,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  });

  await userRepository.save(user);

  return user;
};
