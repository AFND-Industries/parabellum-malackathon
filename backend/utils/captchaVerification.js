// utils/captchaVerification.js
const axios = require('axios');

// Función para verificar el reCAPTCHA
const verifyCaptcha = async (captchaToken) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`);

  return response.data.success;
};

module.exports = { verifyCaptcha };
