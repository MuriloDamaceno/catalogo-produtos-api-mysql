const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, senha]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Murilo Damaceno
 *               email:
 *                 type: string
 *                 example: murilo@email.com
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: E-mail já cadastrado ou dados inválidos
 */
router.post('/registrar', authController.registrar);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login e retorna o token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email:
 *                 type: string
 *                 example: murilo@email.com
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado, token retornado
 *       401:
 *         description: E-mail ou senha inválidos
 */
router.post('/login', authController.login);

module.exports = router;