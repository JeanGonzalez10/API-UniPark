import { pool } from "../../../db/dbConnection.js";

const getCliente = async (req, res) => {
	try {
		const { cedula } = req.params;
		const [rows] = await pool.query("SELECT * FROM CLIENTE WHERE cedula = ?", [
			cedula,
		]);

		if (rows.length === 0) {
			return res.status(404).json({ message: "Cliente no encontrado" });
		} else {
			return res.json(rows[0]);
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const getClientes = async (req, res) => {
	try {
		const [rows] = await pool.query("SELECT * FROM CLIENTE");
		res.json(rows);
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const createCliente = async (req, res) => {
	try {
		const { cedula, nombres, apellidos, celular } = req.body;

		await pool.query(
			"INSERT INTO CLIENTE (cedula, nombres, apellidos, celular) VALUES (?, ?, ?, ?)",
			[cedula, nombres, apellidos, celular]
		);

		res.status(201).send({
			cedula,
			nombres,
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
			"UPDATE CLIENTE SET nombres = IFNULL(?, nombres), apellidos = IFNULL(?, apellidos), celular = IFNULL(?, celular) WHERE cedula = ?",
			[nombres, apellidos, celular, cedula]
		);

		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Cliente no encontrado" });
		} else {
			const [updatedCliente] = await pool.query(
				"SELECT * FROM CLIENTE WHERE cedula = ?",
				[cedula]
			);
			res.json(updatedCliente[0]);
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const deleteCliente = async (req, res) => {
	const placas_vehiculos = [];

	try {
		const { cedula } = req.params;

		const [cliente] = await pool.query(
			"SELECT * FROM CLIENTE WHERE cedula = ?",
			[cedula]
		);

		await pool.query(
			"INSERT INTO HISTORICO_CLIENTE (cedula, nombres, apellidos, celular, fecha_eliminacion) VALUES (?, ?, ?, ?, ?)",
			[
				cliente[0].cedula,
				cliente[0].nombres,
				cliente[0].apellidos,
				cliente[0].celular,
				getfecha(),
			]
		);

		const [usuario] = await pool.query(
			"SELECT * FROM USUARIO WHERE id_usuario = ?",
			[cedula]
		);

		await pool.query(
			"INSERT INTO HISTORICO_USUARIO (id_usuario, nick, clave,fecha_eliminacion) VALUES (?, ?, ?, ?)",
			[usuario[0].id_usuario, usuario[0].nick, usuario[0].clave, getfecha()]
		);

		await pool.query("DELETE FROM USUARIO WHERE id_usuario = ?", [cedula]);

		const [facturas] = await pool.query(
			"SELECT * FROM FACTURACION WHERE id_cliente = ?",
			[cedula]
		);

		if (facturas.length > 0) {
			await Promise.all(
				facturas.map(async (factura) => {
					await pool.query(
						"INSERT INTO HISTORICO_FACTURACION (id_factura, id_reserva, id_solicitud_lavado, fecha, valor_total, id_cliente, fecha_eliminacion) VALUES (?, ?, ?, ?, ?, ?, ?)",
						[
							factura.id_factura,
							factura.id_reserva,
							factura.id_solicitud_lavado,
							factura.fecha,
							factura.valor_total,
							factura.id_cliente,
							getfecha(),
						]
					);
				})
			);
		}
		await pool.query("DELETE FROM FACTURACION WHERE id_cliente = ?", [cedula]);

		const [vehiculos] = await pool.query(
			"SELECT * FROM VEHICULO WHERE id_propietario = ?",
			[cedula]
		);

		await Promise.all(
			vehiculos.map(async (vehiculo) => {
				await pool.query(
					"INSERT INTO HISTORICO_VEHICULO (placa_vehiculo, id_tipo_vehiculo, id_propietario, fecha_eliminacion) VALUES (?, ?, ?, ?)",
					[
						vehiculo.placa_vehiculo,
						vehiculo.id_tipo_vehiculo,
						vehiculo.id_propietario,
						getfecha(),
					]
				);
				placas_vehiculos.push(vehiculo.placa_vehiculo);
			})
		);

		await Promise.all(
			placas_vehiculos.map(async (placa) => {
				const [reservas] = await pool.query(
					"SELECT * FROM RESERVA WHERE placa_vehiculo = ?",
					[placa]
				);
				if (reservas.length > 0) {
					await Promise.all(
						reservas.map(async (reserva) => {
							await pool.query(
								"INSERT INTO HISTORICO_RESERVA (id_reserva, fecha_reserva, placa_vehiculo, id_celda, fecha_ingreso, fecha_salida, fecha_eliminacion) VALUES (?, ?, ?, ?, ?, ?, ?)",
								[
									reserva.id_reserva,
									reserva.fecha_reserva,
									reserva.placa_vehiculo,
									reserva.id_celda,
									reserva.fecha_ingreso,
									reserva.fecha_salida,
									getfecha(),
								]
							);
						})
					);
					await pool.query("DELETE FROM RESERVA WHERE placa_vehiculo = ?", [
						placa,
					]);
				}
			})
		);

		await pool.query("DELETE FROM VEHICULO WHERE id_propietario = ?", [cedula]);

		const [result] = await pool.query("DELETE FROM CLIENTE WHERE cedula = ?", [
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

const getfecha = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return `${year}-${month}-${day}`;
};

export { getCliente, getClientes, createCliente, updateCliente, deleteCliente };
