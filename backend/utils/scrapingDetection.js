const scrapingDetection = (req, res, next) => {
    const userAgent = req.headers['user-agent'];

    // Lista de patrones de User-Agent que indican scraping
    const scrapingUserAgents = [
        /scrapy/i,
        /selenium/i,
        /headlesschrome/i,
        /wget/i,
        /curl/i,
        /python-requests/i,
        /python/i,
        /web scraper/i,
        /Mozilla\/5.0 \(compatible; Scrapy\)/i,
        /Java\/1.8.0_*/i,
    ];

    // Verifica si el User-Agent coincide con algún patrón de scraping
    const isScraping = scrapingUserAgents.some(pattern => pattern.test(userAgent));

    if (isScraping) {
        // Si se detecta scraping, retorna un error
        return res.status(403).json({ error: 'Acceso prohibido debido a actividad sospechosa.' });
    }

    next(); // Llama al siguiente middleware si no se detecta scraping
};

module.exports = scrapingDetection;
