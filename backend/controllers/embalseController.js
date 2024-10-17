const axios = require('axios'); // Asegúrate de importar axiosAsegúrate de que estas funciones estén definidas
const oracledb = require('oracledb');



const embsalseController = {};

embsalseController.getByCoords = async (req, res) => {
  let connection; // Declarar la conexión aquí para el finally
  try {
    const { x, y, radius } = req.query;

    // Verificar que los parámetros existan
    if (!x || !y || !radius) {
      return res.status(400).json({ error: "Faltan parámetros: x, y y/o radius son requeridos." });
    }

    // Realiza una solicitud GET a tu API de FastAPI
    const fastApiUrl = `http:/localhost:6996/api/embalses?x=${x}&y=${y}&radius=${radius}`;
    const fastApiResponse = await axios.get(fastApiUrl);
    console.log(fastApiResponse.data) // URL de tu FastAPI

    // Envía la respuesta de FastAPI a tu cliente
    res.json(fastApiResponse.data);

  } catch (error) {
    console.error(error); // Log del error
    res.status(500).json({ error: "Error al conectar con la base de datos o FastAPI" });
  } finally {
    // Cierra la conexión, solo si fue abierta
    if (connection) {
      await closeConnection(connection);
    }
  }
};

module.exports = embsalseController;
