import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IUserLogin } from "../../interfaces/users";

export const loginService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const usersRepository = AppDataSource.getRepository(Users);

  const user = await usersRepository.findOneBy({ email });

  if (!user) {
    throw new AppError("Invalid credentials", 403);
  }

  if (!user.isActive) {
    throw new AppError("User is not active", 400);
  }

  const isPassword = await compare(password, user.password);

  if (!isPassword) {
    throw new AppError("Invalid credentials", 403);
  }

  const token = jwt.sign(
    {
      isAdm: user.isAdm,
    },
    process.env.SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: "2h",
    }
  );

  return token;
};
