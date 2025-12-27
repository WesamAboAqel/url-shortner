import express from "express";
import {
    createUrl,
    deleteUrl,
    getOriginal,
    updateUrl,
} from "../controllers/url.controller.js";

const router = express.Router();

router.post("/api/url", createUrl);
router.get("/:short_url", getOriginal);
router.put("/api/url", updateUrl);
router.delete("/api/url", deleteUrl);

export default router;
