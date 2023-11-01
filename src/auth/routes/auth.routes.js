import { Router } from "express";
import {
	registerUsuario,
	loginUsuario,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerUsuario);

router.post("/login", loginUsuario);

export default router;
