import { Router } from "express";
import { z } from "zod";
import mongoose from "mongoose";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { CartModel } from "../cart/cart.model.js";
import { OrderModel } from "./order.model.js";
import { ProductModel } from "../products/product.model.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok, created } from "../../utils/api-response.js";
import { ApiError } from "../../utils/api-error.js";

const router=Router();
const checkoutSchema=z.object({shippingFee:z.coerce.number().nonnegative().max(100000).default(0)});
router.get("/",requireAuth,asyncHandler(async(_req,res)=>{const u=res.locals.user as {id:string}; res.json(ok(await OrderModel.find({userId:u.id}).sort({createdAt:-1}).lean()));}));
router.get("/:id",requireAuth,asyncHandler(async(req,res)=>{const u=res.locals.user as {id:string}; const o=await OrderModel.findOne({_id:req.params.id,userId:u.id}).lean(); if(!o)throw new ApiError(404,"Order not found"); res.json(ok(o));}));
router.post("/checkout",requireAuth,asyncHandler(async(req,res)=>{
  const u=res.locals.user as {id:string}; const {shippingFee}=checkoutSchema.parse(req.body); const session=await mongoose.startSession();
  try { let createdOrder:any;
    await session.withTransaction(async()=>{
      const cart=await CartModel.findOne({userId:u.id}).session(session); if(!cart||cart.items.length===0)throw new ApiError(400,"Cart is empty");
      const ids=cart.items.map(i=>i.productId); const products=await ProductModel.find({_id:{$in:ids},isActive:true}).session(session);
      const byId=new Map(products.map(p=>[p._id.toString(),p])); const items:any[]=[]; let subtotal=0;
      for(const ci of cart.items){const p=byId.get(ci.productId.toString()); if(!p)throw new ApiError(400,"A cart product is unavailable"); if(p.stock<ci.quantity)throw new ApiError(400,`Insufficient stock for ${p.name}`); const unitPrice=p.price; subtotal+=unitPrice*ci.quantity; items.push({productId:p._id,sellerId:p.sellerId,name:p.name,quantity:ci.quantity,unitPrice});}
      for(const ci of cart.items){const updated=await ProductModel.findOneAndUpdate({_id:ci.productId,stock:{$gte:ci.quantity}},{ $inc:{stock:-ci.quantity}},{new:true}).session(session); if(!updated)throw new ApiError(409,"Stock changed; please try again");}
      createdOrder=await OrderModel.create([{userId:u.id,items,subtotal,shippingFee,total:subtotal+shippingFee}],{session}); cart.items=[]; await cart.save({session});
    });
    res.status(201).json(created(createdOrder[0],"Order created"));
  } finally { await session.endSession(); }
}));
router.patch("/:id/cancel",requireAuth,asyncHandler(async(req,res)=>{const u=res.locals.user as {id:string}; const o=await OrderModel.findOne({_id:req.params.id,userId:u.id}); if(!o)throw new ApiError(404,"Order not found"); if(!["pending","confirmed"].includes(o.status))throw new ApiError(400,"Order cannot be cancelled now"); o.status="cancelled"; await o.save(); res.json(ok(o,"Order cancelled"));}));
export default router;
