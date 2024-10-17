// utils/captchaVerification.js
const axios = require('axios');

// Función para verificar el reCAPTCHA
const verifyCaptcha = async (captchaToken) => {
  const secretKey = "6LfoSWQqAAAAAPOu29WEbkwF3KRxTNVqXNmi-rI2"; // Asegúrate de que esta clave esté definida en tu archivo .env

  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify', 
      null, // No es necesario enviar un cuerpo en la solicitud POST
      {
        params: {
          secret: secretKey,
          response: captchaToken
        }
      }
    );
    return response.data.success;
  } catch (error) {
    console.error('Error al verificar CAPTCHA:', error);
    throw error;
  }
};

module.exports = { verifyCaptcha };
