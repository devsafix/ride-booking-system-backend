import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

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

export const AuthControllers = { register, login };
