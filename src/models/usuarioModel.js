const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: [true, 'Nome é obrigatório'] },
    email: { type: String, required: [true, 'Email é obrigatório'], unique: true },
    senha: { type: String, required: [true, 'Senha é obrigatória'] }
});

// Criptografa a senha antes de salvar
usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next();
    this.senha = await bcrypt.hash(this.senha, 10);
    next();
});

module.exports = mongoose.model('Usuario', usuarioSchema);