import { Router } from "express";
import {
	getParqueadero,
	getParqueaderos,
	updateParqueadero,
} from "../controllers/parqueadero.controller.js";

const router = Router();

router.get("/parqueadero", getParqueaderos);

router.get("/parqueadero/:id", getParqueadero);

router.patch("/parqueadero/:id", updateParqueadero);

export default router;
