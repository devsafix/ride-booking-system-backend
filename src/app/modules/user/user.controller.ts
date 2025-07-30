import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const getUsers = async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
};

const block = async (req: Request, res: Response) => {
  const result = await UserServices.blockUser(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User blocked successfully",
    data: result,
  });
};

const unblock = async (req: Request, res: Response) => {
  const result = await UserServices.unblockUser(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User unblocked successfully",
    data: result,
  });
};

const approve = async (req: Request, res: Response) => {
  const result = await UserServices.approveDriver(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Driver approved successfully",
    data: result,
  });
};

const suspend = async (req: Request, res: Response) => {
  const result = await UserServices.suspendDriver(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Driver suspended successfully",
    data: result,
  });
};

export const UserControllers = { getUsers, block, unblock, approve, suspend };
