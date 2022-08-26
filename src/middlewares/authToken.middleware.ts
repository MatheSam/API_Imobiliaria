import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { handleError } from "./errors.mid";
import jwt from "jsonwebtoken";

export const authToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    let token = request.headers.authorization;

    if (!token) {
      throw new AppError("Invalid token", 401);
    }

    token = token.split(" ")[1];

    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      (error: any, decoded: any) => {
        if (error) {
          throw new AppError("Invalid token", 401);
        }

        request.user = {
          isAdm: decoded.isAdm,
          id: decoded.sub,
        };

        next();
      }
    );
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};
