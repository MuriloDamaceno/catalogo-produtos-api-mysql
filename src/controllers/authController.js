const UsuarioModel = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');

// REGISTRO
exports.registrar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: 'Nome, email e senha são obrigatórios' });
        }

        const usuarioExiste = await UsuarioModel.buscarPorEmail(email);
        if (usuarioExiste) {
            return res.status(400).json({ mensagem: 'E-mail já cadastrado' });
        }

        const id = await UsuarioModel.criar({ nome, email, senha });
        return res.status(201).json({ mensagem: 'Usuário criado com sucesso', id });

    } catch (erro) {
        return res.status(500).json({ mensagem: 'Erro ao registrar', erro: erro.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios' });
        }

        const usuario = await UsuarioModel.buscarPorEmail(email);
        if (!usuario) {
            return res.status(401).json({ mensagem: 'E-mail ou senha inválidos' });
        }

        const senhaCorreta = await UsuarioModel.verificarSenha(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'E-mail ou senha inválidos' });
        }

        const token = jwt.sign(
            { id: usuario.id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso',
            token,
            usuarioId: usuario.id
        });

    } catch (erro) {
        return res.status(500).json({ mensagem: 'Erro ao fazer login', erro: erro.message });
    }
};