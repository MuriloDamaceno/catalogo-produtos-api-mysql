const express = require('express');
const router = express.Router();

// Rota pública de monitoramento — não exige autenticação
router.get('/status', (req, res) => {
    return res.status(200).json({
        versao: '2.0.0',
        status: 'online',
        banco: 'MySQL'
    });
});

module.exports = router;