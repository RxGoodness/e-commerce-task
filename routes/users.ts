import express from "express";
import { createAdmin, loginAdmin } from "../controllers/users";

const router = express.Router();
router.route("/create").post(createAdmin);
router.route("/login").post(loginAdmin);

export default router;
