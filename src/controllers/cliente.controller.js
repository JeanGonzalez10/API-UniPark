import { pool } from "../../db/dbConnection.js";

const getCliente = async (req, res) => {
	try {
		const { cedula } = req.params;
		const [rows] = await pool.query("SELECT * FROM cliente WHERE cedula = ?", [
			cedula,
		]);
		if (rows.length === 0) {
			return res.status(404).json({ message: "Cliente no encontrado" });
		} else {
			res.json(rows[0]);
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const getClientes = async (req, res) => {
	try {
		const [rows] = await pool.query("SELECT * FROM cliente");
		res.json(rows);
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const createCliente = async (req, res) => {
	try {
		const { cedula, nombre, apellidos, celular } = req.body;

		await pool.query(
			"INSERT INTO cliente (cedula, nombres, apellidos, celular) VALUES (?, ?, ?, ?)",
			[cedula, nombre, apellidos, celular]
		);

		res.status(201).send({
			cedula,
			nombre,
			apellidos,
			celular,
		});
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const updateCliente = async (req, res) => {
	try {
		const { cedula } = req.params;
		const { nombres, apellidos, celular } = req.body;

		const [result] = await pool.query(
			"UPDATE cliente SET nombres = IFNULL(?, nombres), apellidos = IFNULL(?, apellidos), celular = IFNULL(?, celular) WHERE cedula = ?",
			[nombres, apellidos, celular, cedula]
		);

		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Cliente no encontrado" });
		} else {
			const [updatedCliente] = await pool.query(
				"SELECT * FROM cliente WHERE cedula = ?",
				[cedula]
			);
			res.json(updatedCliente[0]);
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const deleteCliente = async (req, res) => {
	try {
		const { cedula } = req.params;
		const [result] = await pool.query("DELETE FROM cliente WHERE cedula = ?", [
			cedula,
		]);
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Cliente no encontrado" });
		} else {
			res.status(200).json({ message: "Cliente eliminado" });
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

export { getCliente, getClientes, createCliente, updateCliente, deleteCliente };
