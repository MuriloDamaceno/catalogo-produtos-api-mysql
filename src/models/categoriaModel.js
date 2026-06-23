const conexao = require('../config/database');

class CategoriaModel {
    static async buscarTodas() {
        const sql = 'SELECT * FROM categoria ORDER BY id_Categoria ASC';
        const [linhas] = await conexao.execute(sql);
        return linhas;
    }

    static async buscarPorId(id) {
        const sql = 'SELECT * FROM categoria WHERE id_Categoria = ?';
        const [linhas] = await conexao.execute(sql, [id]);
        return linhas.length > 0 ? linhas[0] : null;
    }

    static async criar({ nome }) {
        const sql = 'INSERT INTO categoria (nome) VALUES (?)';
        const [resultado] = await conexao.execute(sql, [nome]);
        return resultado.insertId;
    }

    static async atualizar(id, { nome }) {
        const sql = 'UPDATE categoria SET nome = ? WHERE id_Categoria = ?';
        const [resultado] = await conexao.execute(sql, [nome, id]);
        return resultado.affectedRows > 0;
    }

    static async deletar(id) {
        const sql = 'DELETE FROM categoria WHERE id_Categoria = ?';
        const [resultado] = await conexao.execute(sql, [id]);
        return resultado.affectedRows > 0;
    }
}

module.exports = CategoriaModel;