import type { RequestHandler } from "express";
import { auth } from "../modules/auth/auth.js";
import { ApiError } from "../utils/api-error.js";

export const requireAuth: RequestHandler = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({ headers: req.headers as Record<string, string> });
    if (!session?.user) return next(new ApiError(401, "Authentication required"));
    res.locals.user = session.user;
    res.locals.session = session.session;
    next();
  } catch (error) { next(error); }
};
