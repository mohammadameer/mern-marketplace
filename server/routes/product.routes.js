import express from "express";
import authController from "../controllers/auth.controller";
import { isOwner, shopById } from "../controllers/shop.controller";
import {
  create,
  read,
  list,
  listByShop,
  listLatest,
  listRelated,
  listCategories,
  productById,
  update,
  remove,
  image
} from "../controllers/product.controller";

const router = express.Router();

router
  .route("/api/products/by/:shopId")
  .post(authController.requireSignin, isOwner, create)
  .get(listByShop);

router.route("/api/products/latest").get(listLatest);

router.route("/api/products/related/:productId").get(listRelated);

router.route("/api/products/categories").get(listCategories);

router.route("/api/products").get(list);

router.route("/api/products/:productId").get(read);

router
  .route(`/api/product/:shopId/:productId`)
  .put(update)
  .delete(remove);

router.route("/api/product/image/:productId").get(image);

router.param("shopId", shopById);
router.param("productId", productById);

export default router;
