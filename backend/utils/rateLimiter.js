// utils/rateLimiter.js
const rateLimit = require('express-rate-limit');

// Rate limiter para limitar la cantidad de peticiones
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 100, // Max 100 peticiones por minuto
  handler: (req, res) => {
    // Si excede el límite, cerramos la conexión del usuario
    if (req.user && req.user.connection) {
      // Cierra la conexión del usuario
      req.user.connection.close(); // Asegúrate de que 'close' sea el método correcto para cerrar la conexión
    }

    // Responde al cliente indicando que ha excedido el límite
    res.status(429).send({ error: 'Demasiadas solicitudes, por favor intenta más tarde.' });
  }
});

module.exports = limiter;
