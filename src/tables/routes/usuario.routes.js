import { Router } from "express";
import {
	updateUsuario,
	deleteUsuario,
} from "../controllers/usuario.controller.js";

const router = Router();

router.patch("/usuario/:id_usaurio", updateUsuario);

router.delete("/usuario/:id_usaurio", deleteUsuario);

export default router;
