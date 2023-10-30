import { pool } from "../../db/dbConnection.js";

const getEstadoCelda = async (req, res) => {
	try {
		const { id } = req.params;
		const [rows] = await pool.query(
			"SELECT * FROM estado_celda WHERE id_estado = ?",
			[id]
		);
		res.json(rows[0]);
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const getEstadoCeldas = async (req, res) => {
	try {
		const [rows] = await pool.query("SELECT * FROM estado_celda");
		res.json(rows);
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

export { getEstadoCelda, getEstadoCeldas };
