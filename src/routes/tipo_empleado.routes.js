import { Router } from "express";
import {
	getTipoEmpleado,
	getTipoEmpleados,
} from "../controllers/tipo_empleado.controller.js";

const router = Router();

router.get("/tipoEmpleado", getTipoEmpleados);

router.get("/tipoEmpleado/:id", getTipoEmpleado);

export default router;
