import { Router } from "express";
import {
	getClientes,
	getCliente,
	createCliente,
	updateCliente,
	deleteCliente,
} from "../controllers/cliente.controller.js";

const router = Router();

router.get("/cliente", getClientes);

router.get("/cliente/:cedula", getCliente);

router.post("/cliente", createCliente);

router.patch("/cliente/:cedula", updateCliente);

router.delete("/cliente/:cedula", deleteCliente);

export default router;
