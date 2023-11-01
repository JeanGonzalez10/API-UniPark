import { Router } from "express";
import {
	createUsuario,
} from "../controllers/usuario.controller.js";

const router = Router();

router.post("/usuario", createUsuario);

router.post("/usuario", createUsuario);

export default router;
