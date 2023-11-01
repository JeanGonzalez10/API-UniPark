import { pool } from "../../../db/dbConnection.js";

const registerUsuario = async (req, res) => {
	try {
		const { id_usuario, nick, clave } = req.body;

		await pool.query(
			"INSERT INTO USUARIO (id_usuario, nick, clave) VALUES (?, ?, ?)",
			[id_usuario, nick, clave]
		).then(() => {
			res.status(200).json({ 
				message: "Usuario registrado",
				nick,
				clave
			});
		}).catch((err) => {
			res.status(500).json({ message: "Error en la consulta", error: err });
		});

	} catch (err) {
		res.status(500).json({ message: "Error en el servidor", error: err });
	}
};

const loginUsuario = async (req, res) => {
	try {
		const { nick, clave } = req.body;

		const [rows] = await pool.query(
			"SELECT * FROM USUARIO WHERE nick = ? AND clave = ?",
			[nick, clave]
		);
		if (rows.length === 0) {
			return res.status(401).json({ 
				message: "Credenciales incorrectas",
				error: "Unauthorized",
				statusCode: 401
			});
		}else{
			return res.status(200).json(rows[0]);
		}
	} catch (err) {
		res.status(500).json({ message: "Error en el servidor", error: err });
	}
};

export { registerUsuario, loginUsuario };
