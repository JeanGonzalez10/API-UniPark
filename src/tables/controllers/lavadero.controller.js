import { pool } from "../../../db/dbConnection.js";

const getLavadero = async (req, res) => {
	try {
		const { id } = req.params;
		const [rows] = await pool.query(
			"SELECT * FROM LAVADERO WHERE id_solicitud = ?",
			[id]
		);
		if (rows.length === 0) {
			return res
				.status(404)
				.json({ message: "Servicio de lavado no encontrado" });
		} else {
			res.json(rows[0]);
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const getLavaderos = async (req, res) => {
	try {
		const [rows] = await pool.query("SELECT * FROM LAVADERO");
		if (rows.length === 0) {
			return res
				.status(404)
				.json({ message: "Servicio de lavados no encontrados" });
		} else {
			res.json(rows);
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const createLavadero = async (req, res) => {
	try {
		const { placa_vehiculo, fecha_solicitud, id_tipo_lavado, tarifa } =
			req.body;

		const [rows] = await pool.query(
			"INSERT INTO LAVADERO (placa_vehiculo, fecha_solicitud, id_tipo_lavado, tarifa) VALUES (?, ?, ?, ?)",
			[placa_vehiculo, fecha_solicitud, id_tipo_lavado, tarifa]
		);

		res.status(201).send({
			id_solicitud: rows.insertId,
			placa_vehiculo,
			fecha_solicitud,
			id_tipo_lavado,
			tarifa,
			id_empleado: null,
		});
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const updateLavadero = async (req, res) => {
	try {
		const { id } = req.params;
		const { id_empleado } = req.body;

		const [result] = await pool.query(
			"UPDATE LAVADERO SET id_empleado = ? WHERE id_solicitud = ?",
			[id_empleado, id]
		);
		if (result.affectedRows === 0) {
			return res
				.status(404)
				.json({ message: "Servicio de lavado no encontrado" });
		} else {
			const [updatedLavadero] = await pool.query(
				"SELECT * FROM LAVADERO WHERE id_solicitud = ?",
				[id]
			);
			res.json(updatedLavadero[0]);
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const deleteLavadero = async (req, res) => {
	try {
		const { id } = req.params;
		const [result] = await pool.query(
			"DELETE FROM LAVADERO WHERE id_solicitud = ?",
			[id]
		);
		if (result.affectedRows === 0) {
			return res
				.status(404)
				.json({ message: "Servicio de lavado no encontrado" });
		} else {
			res.status(200).json({ message: "Servicio de lavado eliminado" });
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

export {
	getLavadero,
	getLavaderos,
	createLavadero,
	updateLavadero,
	deleteLavadero,
};
