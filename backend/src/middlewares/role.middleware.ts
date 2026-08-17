import type { RequestHandler } from "express";
import { ApiError } from "../utils/api-error.js";

export function requireRole(...roles: string[]): RequestHandler {
  return (_req, res, next) => {
    const user = res.locals.user as { role?: string } | undefined;
    if (!user || !roles.includes(user.role ?? "")) return next(new ApiError(403, "Insufficient permissions"));
    next();
  };
}
