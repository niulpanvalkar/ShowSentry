import express from "express";
import * as userValidator from "../validators/user-validator.js";
import * as userController from "../controllers/user-controller.js";
import tokenMiddleware from "../middlewares/token-middleware.js";


const router = express.Router();


router.post("/signup", userValidator.validateUserSignup, userController.create);
router.post("/signin", userValidator.validateUserSignin, userController.signin);
router.get("/info", tokenMiddleware.auth, userController.getInfo);

export default router;