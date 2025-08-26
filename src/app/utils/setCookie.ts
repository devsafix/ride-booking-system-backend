import { Response } from "express";

export const setAuthCookie = (res: Response, tokenInfo: string) => {
  if (tokenInfo) {
    res.cookie("accessToken", tokenInfo, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: "https://ridaa.vercel.app",
      maxAge: 2592000000,
    });
  }
};
