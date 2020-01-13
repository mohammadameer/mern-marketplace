import express from "express";
import authController from "../controllers/auth.controller";
import { isOwner, shopById } from "../controllers/shop.controller";
import { create } from "../controllers/product.controller";

const router = express.Router();

router
  .route("/api/products/by/:shopId")
  .post(authController.requireSignin, isOwner, create);

router.param("shopId", shopById);

export default router;
