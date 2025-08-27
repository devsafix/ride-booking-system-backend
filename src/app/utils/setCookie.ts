import { Response } from "express";

export const setAuthCookie = (res: Response, tokenInfo: string) => {
  if (tokenInfo) {
    res.cookie("accessToken", tokenInfo, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 2592000000,
    });
  }
};

export const setRefreshCookie = (res: Response, tokenInfo: string) => {
  if (tokenInfo) {
    res.cookie("refreshToken", tokenInfo, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 2592000000,
    });
  }
};
