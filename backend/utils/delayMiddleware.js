const delayMiddleware = (req, res, next) => {
    // Define el tiempo de retardo en milisegundos
    const delayTime = 1000; // 1 segundo (1000 ms)

    // Introduce el retardo
    setTimeout(() => {
        next(); // Continúa con el siguiente middleware o ruta
    }, delayTime);
};

module.exports = delayMiddleware;