import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error";

/*
 * INTEGRATION POINT — Better Auth Verification
 *
 * Flow:
 * 1. Extract Better Auth credential from request (cookie or Authorization header)
 * 2. Verify via Better Auth mechanism
 * 3. Extract trusted authUserId
 * 4. Find app user in MongoDB
 * 5. Attach to req.user
 *
 * NEVER trust userId or role sent directly from frontend.
 *
 * TODO: Replace placeholder below with real Better Auth verification.
 */

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: "CUSTOMER" | "SELLER" | "ADMIN";
      };
    }
  }
}

const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    /*
     * PLACEHOLDER — Replace with real Better Auth verification:
     *
     * const session = await betterAuth.verifySession(req);
     * if (!session) throw new ApiError(401, "Unauthorized");
     *
     * const appUser = await UserModel.findOne({ authUserId: session.userId });
     * if (!appUser) throw new ApiError(401, "User not found");
     *
     * req.user = { id: appUser._id.toString(), role: appUser.role };
     */

    throw new ApiError(
      501,
      "Authentication middleware not yet connected to Better Auth"
    );
  } catch (error) {
    next(error);
  }
};

export default authenticate;
