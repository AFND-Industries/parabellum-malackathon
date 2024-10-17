// controllers/captchaController.js
const axios = require('axios');
const { verifyCaptcha } = require('../utils/captchaVerification');

exports.submitForm = async (req, res) => {
  try {
    const captchaToken = req.body['g-recaptcha-response'];
    
    // Verificamos el CAPTCHA usando la API de Google
    const captchaValid = await verifyCaptcha(captchaToken);
    
    if (captchaValid) {
      // Procesar la solicitud si el CAPTCHA es válido
      res.status(200).send('Formulario enviado con éxito.');
    } else {
      res.status(403).send('Error de CAPTCHA.');
    }
  } catch (error) {
    res.status(500).send('Error en el servidor.');
  }
};
