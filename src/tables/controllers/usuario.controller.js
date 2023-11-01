import { pool } from "../../../db/dbConnection.js";

const updateUsuario = async (req, res) => {
	try {
		const { id_usuario } = req.params;
		const { nick, clave } = req.body;

		const [result] = await pool.query(
			"UPDATE USUARIO SET nick = IFNULL(?, nick), clave = IFNULL(?, clave) WHERE id_usuario = ?",
			[nick, clave, id_usuario]
		);
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		} else {
			const [updatedUsuario] = await pool.query(
				"SELECT * FROM USUARIO WHERE id_usuario = ?",
				[id_usuario]
			);
			res.json(updatedUsuario[0]);
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

const deleteUsuario = async (req, res) => {
	try {
		const { id_usaurio } = req.params;
		const [result] = await pool.query(
			"DELETE FROM USUARIO WHERE id_usuario = ?",
			[id_usaurio]
		);
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		} else {
			res.status(200).json({ message: "Usuario eliminado" });
		}
	} catch (er) {
		res.status(500).json({ message: "Error en el servidor", error: er });
	}
};

export { updateUsuario, deleteUsuario };
