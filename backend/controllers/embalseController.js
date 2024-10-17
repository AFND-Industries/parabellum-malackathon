const axios = require('axios'); // Asegúrate de importar axiosAsegúrate de que estas funciones estén definidas
const oracledb = require('oracledb');



const embsalseController = {};

embsalseController.getByCoords = async (req, res) => {
  try {
    const { x, y, radius } = req.query;

    // Verificar que los parámetros existan
    if (!x || !y || !radius) {
      return res.status(400).json({ error: "Faltan parámetros: x, y y/o radius son requeridos." });
    }

    // Realiza una solicitud GET a tu API de FastAPI
    const fastApiUrl = `http:/localhost:6996/api/embalses?x=${x}&y=${y}&radius=${radius}`; // URL de tu FastAPI
    const fastApiResponse = await axios.get(fastApiUrl); 

    // Envía la respuesta de FastAPI a tu cliente
    res.json(fastApiResponse.data);

  } catch (error) {
    console.error(error); // Log del error
    res.status(500).json({ error: "Error al conectar con la base de datos o FastAPI" });
  } 
};

embsalseController.getAgua = async (req, res) => {
  try {
    const { id } = req.query;

    // Verificar que los parámetros existan
    if (!id) {
      return res.status(400).json({ error: "Falta el parámetro id requerido." });
    }

    // Realiza una solicitud GET a tu API de FastAPI
    const fastApiUrl = `http:/localhost:6996/api/embalses/${id}/agua`;// URL de tu FastAPI
    const fastApiResponse = await axios.get(fastApiUrl);

    // Envía la respuesta de FastAPI a tu cliente
    res.json(fastApiResponse.data);

  } catch (error) {
    console.error(error); // Log del error
    res.status(500).json({ error: "Error al conectar con la base de datos o FastAPI" });
  }
}

embsalseController.getPrediction = async (req, res) => {
  try {
    const { id } = req.query;

    // Verificar que los parámetros existan
    if (!id) {
      return res.status(400).json({ error: "Falta el parámetro id requerido." });
    }

    // Realiza una solicitud GET a tu API de FastAPI
    const fastApiUrl = `http:/localhost:6996/api/embalses/${id}/predict`;// URL de tu FastAPI
    console.log(fastApiUrl);
    const fastApiResponse = await axios.get(fastApiUrl);

    // Envía la respuesta de FastAPI a tu cliente
    res.json(fastApiResponse.data);

  } catch (error) {
    console.error(error); // Log del error
    res.status(500).json({ error: "Error al conectar con la base de datos o FastAPI" });
  }
}

module.exports = embsalseController;
