import { pool } from "../../db/dbConnection.js";

const getTipoCelda = async (req, res) => {
	try {
		const { id } = req.params;
		const [rows] = await pool.query(
			"SELECT * FROM tipo_celda WHERE id_tipo = ?",
			[id]
		);
		res.json(rows[0]);
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const getTipoCeldas = async (req, res) => {
	try {
		const [rows] = await pool.query("SELECT * FROM tipo_celda");
		res.json(rows);
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

export { getTipoCelda, getTipoCeldas };
