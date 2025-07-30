import { Request, Response, NextFunction } from "express";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { envVariables } from "../config/env";
import { verifyToken } from "../utils/jwt";
import { User } from "../modules/user/user.model";

interface JwtPayload {
  id: string;
  role: string;
}

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized: No token");
    }

    const decoded = verifyToken(
      token,
      envVariables.JWT_ACCESS_SECRET
    ) as JwtPayload;

    const isUserExist = await User.findById(decoded.id);

    if (!isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(
      new AppError(
        httpStatus.UNAUTHORIZED,
        `Unauthorized: Invalid token ${error}`
      )
    );
  }
};
