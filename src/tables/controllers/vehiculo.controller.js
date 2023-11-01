import { pool } from "../../../db/dbConnection.js";

const getVehiculo = async (req, res) => {
	try {
		const { placa_vehiculo } = req.params;
		const [rows] = await pool.query(
			"SELECT * FROM VEHICULO WHERE placa_vehiculo = ?",
			[placa_vehiculo]
		);
		if (rows.length === 0) {
			return res.status(404).json({ message: "Vehiculo no encontrado" });
		} else {
			res.json(rows[0]);
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const getVehiculos = async (req, res) => {
	try {
		const [rows] = await pool.query("SELECT * FROM VEHICULO");
		res.json(rows);
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const createVehiculo = async (req, res) => {
	try {
		const { placa_vehiculo, id_tipo_vehiculo, id_propietario } = req.body;

		await pool.query(
			"INSERT INTO VEHICULO (placa_vehiculo, id_tipo_vehiculo, id_propietario) VALUES (?, ?, ?)",
			[placa_vehiculo, id_tipo_vehiculo, id_propietario]
		);

		res.status(201).send({
			placa_vehiculo,
			id_tipo_vehiculo,
			id_propietario,
		});
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const deleteVehiculo = async (req, res) => {
	try {
		const { placa_vehiculo } = req.params;
		const [result] = await pool.query(
			"DELETE FROM VEHICULO WHERE placa_vehiculo = ?",
			[placa_vehiculo]
		);
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Vehiculo no encontrado" });
		} else {
			res.status(200).json({ message: "Vehiculo eliminado" });
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

export { getVehiculo, getVehiculos, createVehiculo, deleteVehiculo };
