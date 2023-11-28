import { pool } from "../../../db/dbConnection.js";

const getEmpleado = async (req, res) => {
	try {
		const { cedula } = req.params;
		const [rows] = await pool.query("SELECT * FROM EMPLEADO WHERE cedula = ?", [
			cedula,
		]);
		if (rows.length === 0) {
			return res.status(404).json({ message: "Empleado no encontrado" });
		} else {
			res.json(rows[0]);
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const getEmpleados = async (req, res) => {
	try {
		const [rows] = await pool.query("SELECT * FROM EMPLEADO");
		res.json(rows);
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const createEmpleado = async (req, res) => {
	try {
		const { cedula, nombres, apellidos, celular, id_tipo_empleado } = req.body;

		await pool.query(
			"INSERT INTO EMPLEADO (cedula, nombres, apellidos, celular, id_tipo_empleado) VALUES (?, ?, ?, ?, ?)",
			[cedula, nombres, apellidos, celular, id_tipo_empleado]
		);

		res.status(201).send({
			cedula,
			nombres,
			apellidos,
			celular,
			id_tipo_empleado,
		});
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const updateEmpleado = async (req, res) => {
	try {
		const { cedula } = req.params;
		const { nombres, apellidos, celular, id_tipo_empleado } = req.body;

		const [result] = await pool.query(
			"UPDATE EMPLEADO SET nombres = IFNULL(?, nombres), apellidos = IFNULL(?, apellidos), celular = IFNULL(?, celular), id_tipo_empleado = IFNULL(?, id_tipo_empleado) WHERE cedula = ?",
			[nombres, apellidos, celular, id_tipo_empleado, cedula]
		);
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Empleado no encontrado" });
		} else {
			const [updatedEmpleado] = await pool.query(
				"SELECT * FROM EMPLEADO WHERE cedula = ?",
				[cedula]
			);
			res.json(updatedEmpleado[0]);
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const deleteEmpleado = async (req, res) => {
	try {
		const { cedula } = req.params;

		const [empleado] = await pool.query(
			"SELECT * FROM EMPLEADO WHERE cedula = ?",
			[cedula]
		);
		await pool.query(
			"INSERT INTO HISTORICO_EMPLEADO (cedula, nombres, apellidos, celular, id_tipo_empleado, fecha_eliminacion) VALUES (?, ?, ?, ?, ?, ?)",
			[
				empleado[0].cedula,
				empleado[0].nombres,
				empleado[0].apellidos,
				empleado[0].celular,
				empleado[0].id_tipo_empleado,
				getfecha(),
			]
		);

		const [usuario] = await pool.query(
			"SELECT * FROM USUARIO WHERE id_usuario = ?",
			[cedula]
		);

		await pool.query(
			"INSERT INTO HISTORICO_USUARIO (id_usuario, nick, clave, fecha_eliminacion) VALUES (?, ?, ?, ?)",
			[usuario[0].id_usuario, usuario[0].nick, usuario[0].clave, getfecha()]
		);

		await pool.query("DELETE FROM USUARIO WHERE id_usuario = ?", [cedula]);

		if (empleado[0].id_tipo_empleado === 3) {
			const [lavadero] = await pool.query(
				"SELECT * FROM LAVADERO WHERE id_empleado = ?",
				[cedula]
			);

			if (lavadero.length !== 0) {
				await pool.query(
					"UPDATE LAVADERO SET id_empleado = ? WHERE id_solicitud = ?",
					[null, id]
				);
			}
		}

		const [result] = await pool.query("DELETE FROM EMPLEADO WHERE cedula = ?", [
			cedula,
		]);
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Empleado no encontrado" });
		} else {
			res.status(200).json({ message: "Empleado eliminado" });
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const getfecha = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return `${year}-${month}-${day}`;
};

export {
	getEmpleado,
	getEmpleados,
	createEmpleado,
	updateEmpleado,
	deleteEmpleado,
};
