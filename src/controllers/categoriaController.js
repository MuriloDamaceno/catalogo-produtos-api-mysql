const CategoriaModel = require('../models/categoriaModel');

// GET /api/categorias
exports.listarTodas = async (req, res) => {
    try {
        const categorias = await CategoriaModel.buscarTodas();
        return res.status(200).json(categorias);
    } catch (erro) {
        return res.status(500).json({ erro: 'Erro interno no servidor: ' + erro.message });
    }
};

// GET /api/categorias/:id
exports.buscarPorId = async (req, res) => {
    try {
        const categoria = await CategoriaModel.buscarPorId(req.params.id);
        if (!categoria) {
            return res.status(404).json({ erro: 'Categoria não encontrada.' });
        }
        return res.status(200).json(categoria);
    } catch (erro) {
        return res.status(500).json({ erro: 'Erro interno no servidor: ' + erro.message });
    }
};

// POST /api/categorias
exports.criar = async (req, res) => {
    try {
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({ erro: 'O campo "nome" é obrigatório.' });
        }

        const id = await CategoriaModel.criar({ nome });
        return res.status(201).json({ id, mensagem: 'Categoria criada com sucesso!' });
    } catch (erro) {
        return res.status(500).json({ erro: 'Erro interno no servidor: ' + erro.message });
    }
};

// PUT /api/categorias/:id
exports.atualizar = async (req, res) => {
    try {
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({ erro: 'O campo "nome" é obrigatório.' });
        }

        const sucesso = await CategoriaModel.atualizar(req.params.id, { nome });
        if (!sucesso) {
            return res.status(404).json({ erro: 'Categoria não localizada para atualização.' });
        }
        return res.status(200).json({ mensagem: 'Categoria atualizada com sucesso!' });
    } catch (erro) {
        return res.status(500).json({ erro: 'Erro interno no servidor: ' + erro.message });
    }
};

// DELETE /api/categorias/:id
exports.deletar = async (req, res) => {
    try {
        const sucesso = await CategoriaModel.deletar(req.params.id);
        if (!sucesso) {
            return res.status(404).json({ erro: 'Categoria não localizada para exclusão.' });
        }
        return res.status(200).json({ mensagem: 'Categoria removida com sucesso!' });
    } catch (erro) {
        return res.status(500).json({ erro: 'Erro interno no servidor: ' + erro.message });
    }
};