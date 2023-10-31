import { pool } from "../../db/dbConnection.js";

const getReserva = async (req, res) => {
	try {
		const { id } = req.params;
		const [rows] = await pool.query(
			"SELECT * FROM RESERVA WHERE id_reserva = ?",
			[id]
		);
		if (rows.length === 0) {
			return res.status(404).json({ message: "Reserva no encontrada" });
		} else {
			res.json(rows[0]);
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const getReservas = async (req, res) => {
	try {
		const [rows] = await pool.query("SELECT * FROM RESERVA");
		if (rows.length === 0) {
			return res.status(404).json({ message: "Reservas no encontradas" });
		} else {
			res.json(rows);
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const createReserva = async (req, res) => {
	try {
		const { fecha_reserva, placa_vehiculo, id_celda } = req.body;

		const [rows] = await pool.query(
			"INSERT INTO RESERVA (fecha_reserva, placa_vehiculo, id_celda) VALUES (?, ?, ?)",
			[fecha_reserva, placa_vehiculo, id_celda]
		);

		res.status(201).send({
			id_reserva: rows.insertId,
			fecha_reserva,
			placa_vehiculo,
			id_celda,
			fecha_ingreso: null,
			fecha_salida: null,
		});
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const updateReserva = async (req, res) => {
	try {
		const { id } = req.params;
		const { fecha_ingreso, fecha_salida } = req.body;

		const [result] = await pool.query(
			"UPDATE RESERVA SET fecha_ingreso = IFNULL(?, fecha_ingreso), fecha_salida = IFNULL(?, fecha_salida) WHERE id_reserva = ?",
			[fecha_ingreso, fecha_salida, id]
		);

		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Reserva no encontrada" });
		} else {
			const [updatedReserva] = await pool.query(
				"SELECT * FROM RESERVA WHERE id_reserva = ?",
				[id]
			);
			res.json(updatedReserva[0]);
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const deleteReserva = async (req, res) => {
	try {
		const { id } = req.params;
		const [result] = await pool.query(
			"DELETE FROM RESERVA WHERE id_reserva = ?",
			[id]
		);
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Reserva no encontrada" });
		} else {
			res.status(200).json({ message: "Reserva eliminada" });
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

export { getReserva, getReservas, createReserva, updateReserva, deleteReserva };
