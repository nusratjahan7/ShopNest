import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from "./product.controller.js";
const router = Router();
router.get("/", asyncHandler(listProducts)); router.get("/:id", asyncHandler(getProduct));
router.post("/", requireAuth, asyncHandler(createProduct)); router.patch("/:id", requireAuth, asyncHandler(updateProduct)); router.delete("/:id", requireAuth, asyncHandler(deleteProduct));
export default router;
