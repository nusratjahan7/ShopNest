import type { RequestHandler } from "express";
import { ProductModel } from "./product.model.js";
import { createProductSchema, productQuerySchema, updateProductSchema } from "./product.schemas.js";
import { SellerModel } from "../sellers/seller.model.js";
import { ApiError } from "../../utils/api-error.js";
import { ok, created } from "../../utils/api-response.js";

export const listProducts: RequestHandler = async (req, res) => {
  const q = productQuerySchema.parse(req.query); const filter: Record<string, any> = { isActive: true };
  if (q.categoryId) filter.categoryId = q.categoryId; if (q.sellerId) filter.sellerId = q.sellerId;
  if (q.minPrice !== undefined || q.maxPrice !== undefined) filter.price = { ...(q.minPrice !== undefined && { $gte: q.minPrice }), ...(q.maxPrice !== undefined && { $lte: q.maxPrice }) };
  if (q.search) filter.$text = { $search: q.search };
  const sort = q.sort === "price_asc" ? { price: 1 } : q.sort === "price_desc" ? { price: -1 } : q.sort === "rating" ? { rating: -1 } : { createdAt: -1 };
  const skip = (q.page - 1) * q.limit;
  const [items, total] = await Promise.all([ProductModel.find(filter).sort(sort as any).skip(skip).limit(q.limit).lean(), ProductModel.countDocuments(filter)]);
  res.json(ok({ items, pagination: { page: q.page, limit: q.limit, total, pages: Math.ceil(total / q.limit) } }));
};
export const getProduct: RequestHandler = async (req, res) => {
  const item = await ProductModel.findOne({ _id: req.params.id, isActive: true }).lean();
  if (!item) throw new ApiError(404, "Product not found"); res.json(ok(item));
};
export const createProduct: RequestHandler = async (req, res) => {
  const user = res.locals.user as { id: string }; const body = createProductSchema.parse(req.body);
  const seller = await SellerModel.findOne({ ownerUserId: user.id, status: "active" });
  if (!seller) throw new ApiError(403, "Active seller store required");
  const exists = await ProductModel.findOne({ slug: body.slug }); if (exists) throw new ApiError(409, "Slug already exists");
  const product = await ProductModel.create({ ...body, sellerId: seller._id }); res.status(201).json(created(product));
};
export const updateProduct: RequestHandler = async (req, res) => {
  const user = res.locals.user as { id: string }; const body = updateProductSchema.parse(req.body);
  const seller = await SellerModel.findOne({ ownerUserId: user.id }); if (!seller) throw new ApiError(403, "Seller store required");
  const product = await ProductModel.findOneAndUpdate({ _id: req.params.id, sellerId: seller._id }, body, { new: true, runValidators: true }).lean();
  if (!product) throw new ApiError(404, "Product not found"); res.json(ok(product, "Product updated"));
};
export const deleteProduct: RequestHandler = async (req, res) => {
  const user = res.locals.user as { id: string }; const seller = await SellerModel.findOne({ ownerUserId: user.id });
  if (!seller) throw new ApiError(403, "Seller store required");
  const product = await ProductModel.findOneAndUpdate({ _id: req.params.id, sellerId: seller._id }, { isActive: false }, { new: true }).lean();
  if (!product) throw new ApiError(404, "Product not found"); res.json(ok(null, "Product removed"));
};
