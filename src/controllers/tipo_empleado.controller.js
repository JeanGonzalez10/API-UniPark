import { pool } from "../../db/dbConnection.js";

const getTipoEmpleado = async (req, res) => {
	try {
		const { id } = req.params;
		const [rows] = await pool.query(
			"SELECT * FROM tipo_empleado WHERE id_tipo = ?",
			[id]
		);
		res.json(rows[0]);
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const getTipoEmpleados = async (req, res) => {
	try {
		const [rows] = await pool.query("SELECT * FROM tipo_empleado");
		res.json(rows);
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

export { getTipoEmpleado, getTipoEmpleados };
