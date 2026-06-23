javascriptrequire('dotenv').config();
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const apiRoutes = require('./src/routes/apiRoutes');
const authRoutes = require('./src/routes/authRoutes');
const categoriaRoutes = require('./src/routes/categoriaRoutes');

const app = express();

app.use(express.json());

// Configuração do Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Catálogo de Produtos API - MySQL',
            version: '2.0.0',
            description: 'API REST migrada de MongoDB para MySQL',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rotas
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
app.use('/api/categorias', categoriaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📌 Status: http://localhost:${PORT}/api/status`);
    console.log(`📚 Swagger: http://localhost:${PORT}/api-docs`);
    console.log(`🔐 Login: POST http://localhost:${PORT}/auth/login`);
    console.log(`📦 Categorias: http://localhost:${PORT}/api/categorias`);
});