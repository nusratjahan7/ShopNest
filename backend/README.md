# ShopNest E-Commerce Backend

Production-oriented TypeScript backend foundation for a multi-vendor e-commerce platform.

## Implemented
- TypeScript + Express 5
- MongoDB + Mongoose
- Better Auth with MongoDB adapter
- Zod request validation
- Pino HTTP logging
- Rate limiting + centralized errors
- Product listing/search/filter + seller CRUD + soft delete
- Categories CRUD
- Seller/store application + profile
- Cart add/update/remove/clear
- Wishlist add/remove/list
- Transactional checkout with stock validation/decrement
- Order list/detail/cancel
- Product reviews + rating aggregation
- AI shopping advisor, trust-check and incident endpoints
- OpenAI -> Gemini automatic AI fallback
- Vitest foundation

## Setup
```bash
npm install
cp .env.example .env
# Fill MongoDB and Better Auth values. Add at least one AI key for AI endpoints.
npm run typecheck
npm run dev
```

Health: GET /health
Auth: /api/auth/*
Products: /api/products
Categories: /api/categories
Stores: /api/stores
Cart: /api/cart
Wishlist: /api/wishlist
Orders: /api/orders
Reviews: /api/reviews/:productId
AI: /api/ai/chat, /api/ai/advisor, /api/ai/trust-check, /api/ai/incident

## Git safety
Never commit `.env`, auth secrets, MongoDB credentials, AI API keys, payment credentials or private certificates. `.env.example` contains names only.
