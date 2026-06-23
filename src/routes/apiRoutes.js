const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/status:
 *   get:
 *     summary: Verifica o status da API
 *     tags: [Status]
 *     responses:
 *       200:
 *         description: API online
 */
router.get('/status', (req, res) => {
    return res.status(200).json({
        versao: '2.0.0',
        status: 'online',
        banco: 'MySQL'
    });
});

module.exports = router;