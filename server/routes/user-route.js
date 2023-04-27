import express from "express";
import * as userValidator from "../validators/user-validator.js";
import * as userController from "../controllers/user-controller.js";
import tokenMiddleware from "../middlewares/token-middleware.js";
import * as favoriteController from "../controllers/favorite-controller.js";

const router = express.Router();


router.post("/signup", userValidator.validateUserSignup, userController.create);
router.post("/signin", userValidator.validateUserSignin, userController.signin);
router.get("/info", tokenMiddleware.auth, userController.getInfo);
router.put("/update-password", tokenMiddleware.auth, userValidator.validateUpdatePassword, userController.updatePassword);
router.get("/favorites", tokenMiddleware.auth, favoriteController.getFavoritesOfUser);
router.post("/favorites", tokenMiddleware.auth, userValidator.validatePostFavorites, favoriteController.addFavorite);
router.delete("/favorites/:favoriteId", tokenMiddleware.auth, favoriteController.removeFavorite);

export default router;