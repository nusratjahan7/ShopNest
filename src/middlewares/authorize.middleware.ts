import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error";

type Role = "CUSTOMER" | "SELLER" | "ADMIN";

const authorize =
  (...roles: Role[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Forbidden: insufficient permissions"));
    }

    next();
  };

export default authorize;
