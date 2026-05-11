require('dotenv').config();
const express = require('express');
const conectarDB = require('./src/config/db');

const authRoutes = require('./src/routes/authRoutes');
const produtoRoutes = require('./src/routes/produtoRoutes');

const app = express();

// Conecta ao banco
conectarDB();

// Middlewares
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/produtos', produtoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});