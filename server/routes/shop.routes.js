import express from "express";
import authController from "../controllers/auth.controller";
import userController from "../controllers/user.controller";
import * as shopCtrl from "../controllers/shop.controller";

const router = express.Router();

router
  .route("/api/shops/by/:userId")
  .post(
    authController.requireSignin,
    authController.hasAuthorization,
    userController.isSeller,
    shopCtrl.create
  )
  .get(
    authController.requireSignin,
    authController.hasAuthorization,
    shopCtrl.listByOwner
  );

router.route("/api/shops/image/:shopId").get(shopCtrl.image);

router.route("/api/shops").get(shopCtrl.list);

router
  .route("/api/shops/:shopId")
  .get(shopCtrl.read)
  .delete(shopCtrl.remove)
  .put(authController.requireSignin, shopCtrl.isOwner, shopCtrl.update);

router.param("userId", userController.userByID);
router.param("shopId", shopCtrl.shopById);

export default router;
