import { Router } from "express";
import {
	getTipoVehiculo,
	getTipoVehiculos,
} from "../controllers/tipo_vehiculo.controller.js";

const router = Router();

router.get("/tipoVehiculo", getTipoVehiculos);

router.get("/tipoVehiculo/:id", getTipoVehiculo);

export default router;
