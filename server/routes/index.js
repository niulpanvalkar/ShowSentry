import express from "express";

import mediaRoutes from "./media-routes.js";

const router = express.Router();

router.use("/:mediaType",mediaRoutes);

export default router;