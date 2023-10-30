import Express from "express";
import { appRoutes } from "./index.routes.js";

const app = Express();

app.use(Express.json());

app.use("/api", appRoutes);

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});

export default app;
