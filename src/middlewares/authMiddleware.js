const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mensagem: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.id) {
            return res.status(403).json({ mensagem: 'Token inválido: ID do usuário ausente' });
        }

        req.usuarioId = decoded.id;
        next();
    } catch (erro) {
        return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
    }
};