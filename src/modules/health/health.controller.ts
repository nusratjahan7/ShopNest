import { Request, Response } from "express";
import asyncHandler from "../../utils/async-handler";
import { ApiResponse } from "../../utils/api-response";

export const healthCheck = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    res.status(200).json(
      new ApiResponse("ShopNest API is running", {
        status: "OK",
        timestamp: new Date().toISOString(),
      })
    );
  }
);
