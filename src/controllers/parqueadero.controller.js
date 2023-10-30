import { pool } from "../../db/dbConnection.js";

const getParqueadero = async (req, res) => {
	try {
		const { id } = req.params;
		const [rows] = await pool.query(
			"SELECT * FROM parqueadero WHERE id_celda = ?",
			[id]
		);
		if (rows.length === 0) {
			return res.status(404).json({ message: "Parqueadero no encontrado" });
		} else {
			res.json(rows[0]);
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const getParqueaderos = async (req, res) => {
	try {
		const [rows] = await pool.query("SELECT * FROM parqueadero");
		res.json(rows);
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const updateParqueadero = async (req, res) => {
	try {
		const { id } = req.params;
		const { id_estado_celda } = req.body;

		const [result] = await pool.query(
			"UPDATE parqueadero SET id_estado_celda = ? WHERE id_celda = ?",
			[id_estado_celda, id]
		);

		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Parqueadero no encontrado" });
		} else {
			const [updatedParqueadero] = await pool.query(
				"SELECT * FROM parqueadero WHERE id_celda = ?",
				[id]
			);
			res.json(updatedParqueadero[0]);
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

export { getParqueadero, getParqueaderos, updateParqueadero };
