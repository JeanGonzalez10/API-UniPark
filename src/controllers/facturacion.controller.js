import { pool } from "../../db/dbConnection.js";

const getFacturacion = async (req, res) => {
	try {
		const { id } = req.params;
		const [rows] = await pool.query(
			"SELECT * FROM FACTURACION WHERE id_facturacion = ?",
			[id]
		);
		if (rows.length === 0) {
			return res.status(404).json({ message: "Facturacion no encontrada" });
		} else {
			res.json(rows[0]);
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const getFacturaciones = async (req, res) => {
	try {
		const [rows] = await pool.query("SELECT * FROM FACTURACION");
		if (rows.length === 0) {
			return res.status(404).json({ message: "Facturaciones no encontradas" });
		} else {
			res.json(rows);
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const createFacturacion = async (req, res) => {
	try {
		const { fecha_factura, id_cliente } = req.body;

		const [rows] = await pool.query(
			"INSERT INTO FACTURACION (fecha_factura, id_cliente) VALUES (?, ?)",
			[fecha_factura, id_cliente]
		);

		res.status(201).send({
			id_facturacion: rows.insertId,
			id_reserva: null,
			id_solicitud_lavado: null,
			fecha_factura,
			valor_total: null,
			id_cliente,
		});
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const updateFacturacion = async (req, res) => {
	try {
		const { id } = req.params;
		const { id_reserva, id_solicitud_lavado, valor_total } = req.body;

		const [result] = await pool.query(
			"UPDATE FACTURACION SET id_reserva = IFNULL(?, id_reserva), id_solicitud_lavado = IFNULL(?, id_solicitud_lavado), valor_total = IFNULL(?, valor_total) WHERE id_facturacion = ?",
			[id_reserva, id_solicitud_lavado, valor_total, id]
		);

		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Facturacion no encontrada" });
		} else {
			const [updatedFacturacion] = await pool.query(
				"SELECT * FROM FACTURACION WHERE id_facturacion = ?",
				[id]
			);
			res.json(updatedFacturacion[0]);
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const deleteFacturacion = (req, res) => res.send("eliminando FACTURACION");

export {
	getFacturacion,
	getFacturaciones,
	createFacturacion,
	updateFacturacion,
	deleteFacturacion,
};
