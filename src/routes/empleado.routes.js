import { Router } from "express";
import {
	getEmpleados,
	getEmpleado,
	createEmpleado,
	updateEmpleado,
	deleteEmpleado,
} from "../controllers/empleado.controller.js";

const router = Router();

router.get("/empleado", getEmpleados);

router.get("/empleado/:cedula", getEmpleado);

router.post("/empleado", createEmpleado);

router.patch("/empleado/:cedula", updateEmpleado);

router.delete("/empleado/:cedula", deleteEmpleado);

export default router;
