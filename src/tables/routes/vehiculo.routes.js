import { Router } from "express";
import {
	getVehiculo,
	getVehiculos,
	createVehiculo,
	deleteVehiculo,
} from "../controllers/vehiculo.controller.js";

const router = Router();

router.get("/vehiculo", getVehiculos);

router.get("/vehiculo/:placa_vehiculo", getVehiculo);

router.post("/vehiculo", createVehiculo);

router.delete("/vehiculo/:placa_vehiculo", deleteVehiculo);

export default router;
