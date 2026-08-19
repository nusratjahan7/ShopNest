import { Router } from "express";
import healthRoutes from "../modules/health/health.routes";

// Import future module routes here:
// import userRoutes from "../modules/users/user.routes";
// import productRoutes from "../modules/products/product.routes";

const apiRouter = Router();

apiRouter.use("/health", healthRoutes);

// Register future routes:
// apiRouter.use("/users", userRoutes);
// apiRouter.use("/products", productRoutes);

export default apiRouter;
