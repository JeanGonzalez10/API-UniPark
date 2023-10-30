import { Router } from "express";
import {
	getUsuario,
	getUsuarios,
	createUsuario,
	updateUsuario,
	deleteUsuario,
} from "../controllers/usuario.controller.js";

const router = Router();

router.get("/usuario", getUsuarios);

router.get("/usuario/:id_usaurio", getUsuario);

router.post("/usuario", createUsuario);

router.patch("/usuario/:id_usaurio", updateUsuario);

router.delete("/usuario/:id_usaurio", deleteUsuario);

export default router;
