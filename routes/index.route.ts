import express from "express";
import { helloWorld } from "../controllers/index.controller.js";

const router = express.Router();

router.get("/hello", helloWorld);

export default router;
