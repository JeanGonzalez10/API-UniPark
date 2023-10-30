import { Router } from "express";
import {
	getEstadoCelda,
	getEstadoCeldas,
} from "../controllers/estado_celda.controller.js";

const router = Router();

router.get("/estadoCelda", getEstadoCeldas);

router.get("/estadoCelda/:id", getEstadoCelda);

export default router;
