import { Request, Response } from "express";
import { AuthServices } from "./auth.service";

const register = async (req: Request, res: Response) => {
  const user = await AuthServices.registerUser(req.body);
  res.status(201).json({ success: true, data: user });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await AuthServices.loginUser(email, password);
  res.status(200).json({ success: true, data: result });
};

export const AuthControllers = { register, login };
