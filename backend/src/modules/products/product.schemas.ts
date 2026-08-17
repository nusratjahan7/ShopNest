import { z } from "zod";

export const createProductSchema = z.object({
  categoryId: z.string().min(1), name: z.string().trim().min(2).max(180),
  slug: z.string().trim().min(2).max(200).regex(/^[a-z0-9-]+$/), description: z.string().min(10),
  price: z.coerce.number().nonnegative(), compareAtPrice: z.coerce.number().nonnegative().optional(),
  stock: z.coerce.number().int().nonnegative(), images: z.array(z.url()).max(10).default([]),
  tags: z.array(z.string().trim().min(1)).max(30).default([])
});
export const updateProductSchema = createProductSchema.partial();
export const productQuerySchema = z.object({
  search: z.string().trim().optional(), categoryId: z.string().trim().optional(), sellerId: z.string().trim().optional(),
  minPrice: z.coerce.number().nonnegative().optional(), maxPrice: z.coerce.number().nonnegative().optional(),
  page: z.coerce.number().int().positive().default(1), limit: z.coerce.number().int().min(1).max(50).default(12),
  sort: z.enum(["newest", "price_asc", "price_desc", "rating"]).default("newest")
});
