import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { AdminServices } from "./admin.service";

const getRideReport = catchAsync(async (req: Request, res: Response) => {
  const report = await AdminServices.generateRideReport();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "System ride report generated successfully",
    data: report,
  });
});

export const AdminControllers = {
  getRideReport,
};
