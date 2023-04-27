import express from "express";

import * as mediaController from "../controllers/media-controller.js";

const router = express.Router({mergeParams: true});

router.get("/genres", mediaController.getGenres);
router.get("/search", mediaController.search);
router.get("/detail/:mediaId", mediaController.getDetail);
router.get("/:mediaCategory", mediaController.fetchMediaList);


export default router;