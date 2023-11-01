import { Router } from "express";
import {
	getFacturacion,
	getFacturaciones,
	createFacturacion,
	updateFacturacion,
	deleteFacturacion,
} from "../controllers/facturacion.controller.js";

const router = Router();

router.get("/facturacion", getFacturaciones);

router.get("/facturacion/:id", getFacturacion);

router.post("/facturacion", createFacturacion);

router.patch("/facturacion/:id", updateFacturacion);

router.delete("/facturacion/:id", deleteFacturacion);

export default router;
