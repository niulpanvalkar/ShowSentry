import express from "express";

import mediaRoute from "./media-routes.js";

const router = express.Router();

router.use("/:mediatype",mediaRoute);

export default router;