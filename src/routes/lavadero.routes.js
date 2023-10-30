import { Router } from "express";
import {
	getLavadero,
	getLavaderos,
	createLavadero,
	updateLavadero,
	deleteLavadero,
} from "../controllers/lavadero.controller.js";

const router = Router();

router.get("/lavadero", getLavaderos);

router.get("/lavadero/:id", getLavadero);

router.post("/lavadero", createLavadero);

router.patch("/lavadero/:id", updateLavadero);

router.delete("/lavadero/:id", deleteLavadero);

export default router;
