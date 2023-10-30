import { config } from "dotenv";

config();

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 3306;
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "$JeanCarlo$28";
const DB_NAME = process.env.DB_NAME || "unipark";

export { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME };
