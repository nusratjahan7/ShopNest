import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { ApiError } from "../utils/api-error";

type ValidateTarget = "body" | "params" | "query";

const validate =
  (schema: ZodSchema, target: ValidateTarget = "body") =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const message = result.error.errors.map((e) => e.message).join(", ");
      return next(new ApiError(400, message));
    }

    req[target] = result.data;
    next();
  };

export default validate;
