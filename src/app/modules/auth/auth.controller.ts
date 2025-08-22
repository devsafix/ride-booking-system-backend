import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

const register = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthServices.registerUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users register successfully",
    data: user,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await AuthServices.loginUser(res, email, password);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users login successfully",
    data: result,
  });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Logged Out Successfully",
    data: null,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const newPassword = req.body.newPassword;
  const oldPassword = req.body.oldPassword;
  const decodedToken = req.user;

  await AuthServices.changePassword(
    oldPassword,
    newPassword,
    decodedToken as JwtPayload
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Password Changed Successfully",
    data: null,
  });
});

export const AuthControllers = { register, login, logout, changePassword };
