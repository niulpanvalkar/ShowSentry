import express from "express";
import userRoutes from "./user-route.js";
import mediaRoutes from "./media-routes.js";
import reviewRoutes from './review-routes.js';

const router = express.Router();

router.use("/user", userRoutes);
router.use("/reviews", reviewRoutes);
router.use("/:mediaType", mediaRoutes);

export default router;