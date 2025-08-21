import { Response } from "express";

export const setAuthCookie = (res: Response, tokenInfo: string) => {
  //   console.log(res, tokenInfo);

  if (tokenInfo) {
    res.cookie("accessToken", tokenInfo, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }
};
