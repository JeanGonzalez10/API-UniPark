import { Router } from "express";
import {
	getTipoCelda,
	getTipoCeldas,
} from "../controllers/tipo_celda.controller.js";

const router = Router();

router.get("/tipoCelda", getTipoCeldas);

router.get("/tipoCelda/:id", getTipoCelda);

export default router;
