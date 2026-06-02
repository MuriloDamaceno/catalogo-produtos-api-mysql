require('dotenv').config();
const express = require('express');
const conectarDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const produtoRoutes = require('./src/routes/produtoRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;

// Conecta ao banco
conectarDB();

// Middlewares
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/produtos', produtoRoutes);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API Simples',
      version: '1.0.0',
      description: 'Exemplo de API básica com Swagger',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./app.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Endpoint de exemplo
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Olá, mundo!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

