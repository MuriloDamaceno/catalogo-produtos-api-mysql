require('dotenv').config();
const express = require('express');

const apiRoutes = require('./src/routes/apiRoutes');
const authRoutes = require('./src/routes/authRoutes');
const categoriaRoutes = require('./src/routes/categoriaRoutes');

const app = express();

app.use(express.json());

// Rota pública de status
app.use('/api', apiRoutes);

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rotas privadas de categorias
app.use('/api/categorias', categoriaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Status: http://localhost:${PORT}/api/status`);
    console.log(`Login: POST http://localhost:${PORT}/auth/login`);
    console.log(`Categorias: http://localhost:${PORT}/api/categorias`);
});