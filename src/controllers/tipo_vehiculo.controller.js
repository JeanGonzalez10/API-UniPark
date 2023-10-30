import { pool } from "../../db/dbConnection.js";

const getTipoVehiculo = async (req, res) => {
	try {
		const { id } = req.params;
		const [rows] = await pool.query(
			"SELECT * FROM tipo_vehiculo WHERE id_tipo = ?",
			[id]
		);
		res.json(rows[0]);
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const getTipoVehiculos = async (req, res) => {
	try {
		const [rows] = await pool.query("SELECT * FROM tipo_vehiculo");
		res.json(rows);
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

export { getTipoVehiculo, getTipoVehiculos };
