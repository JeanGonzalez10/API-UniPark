import Express from "express";
import authRoute from "./auth/index.js";
import tablesRoute from "./tables/index.js";
import cors from "cors";

const app = Express();

app.use(cors());
app.use(Express.json());

app.use("/api/auth", authRoute);

app.use("/api/", tablesRoute);

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});

export default app;
