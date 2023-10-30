import { Router } from "express";
import {
	getReserva,
	getReservas,
	createReserva,
	updateReserva,
	deleteReserva,
} from "../controllers/reserva.controller.js";

const router = Router();

router.get("/reserva", getReservas);

router.get("/reserva/:id", getReserva);

router.post("/reserva", createReserva);

router.patch("/reserva/:id", updateReserva);

router.delete("/reserva/:id", deleteReserva);

export default router;
