// utils/rateLimiter.js
const rateLimit = require('express-rate-limit');

// Rate limiter para limitar la cantidad de peticiones
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 100, // Max 100 peticiones por minuto
  handler: (req, res, next) => {
    // Si excede el límite, activamos CAPTCHA
    req.activateCaptcha = true;
    next();
  }
});

module.exports = limiter;
