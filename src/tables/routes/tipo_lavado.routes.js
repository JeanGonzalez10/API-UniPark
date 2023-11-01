import { Router } from "express";
import {
	getTipoLavado,
	getTipoLavados,
} from "../controllers/tipo_lavado.controller.js";

const router = Router();

router.get("/tipoLavado", getTipoLavados);

router.get("/tipoLavado/:id", getTipoLavado);

export default router;
