import express from "express";

import * as mediaController from "../controllers/media-controller.js";

const router = express.Router({mergeParams: true});

router.get("/:mediaCategory", mediaController.fetchMediaList);

export default router;