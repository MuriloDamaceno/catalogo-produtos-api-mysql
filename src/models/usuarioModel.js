const conexao = require('../config/database');
const bcrypt = require('bcryptjs');

class UsuarioModel {
    static async buscarPorEmail(email) {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        const [linhas] = await conexao.execute(sql, [email]);
        return linhas.length > 0 ? linhas[0] : null;
    }

    static async buscarPorId(id) {
        const sql = 'SELECT id, nome, email FROM usuarios WHERE id = ?';
        const [linhas] = await conexao.execute(sql, [id]);
        return linhas.length > 0 ? linhas[0] : null;
    }

    static async criar({ nome, email, senha }) {
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
        const [resultado] = await conexao.execute(sql, [nome, email, senhaCriptografada]);
        return resultado.insertId;
    }

    static async verificarSenha(senhaTexto, senhaHash) {
        return bcrypt.compare(senhaTexto, senhaHash);
    }
}

module.exports = UsuarioModel;