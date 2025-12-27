import express from "express";

import { createUrl, getOriginal } from "../controllers/url.controller.js";

const router = express.Router();

router.post("/add", createUrl);
router.get("/:short_url", getOriginal);

export default router;
