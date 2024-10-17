import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios";

const RecevoirContext = createContext(null);
const SERVER_URL = "http://malackathon.yellowbeavers.com:6998"; // CAMBIAR A LOCALHOST EN EL SV

export const RecevoirProvider = ({ children }) => {

    const [showPredict, setShowPredict] = useState(undefined);

    const get = async (url) => await axios.get(SERVER_URL + url);
    const post = async (url, parameters) => await axios.post(SERVER_URL + url, parameters);

    const getEmbalses = async (x, y, radius) => await get("/embalses?x=" + x + "&y=" + y + "&radius=" + radius);
    const getAguaFromEmbalses = async (id) => await get("/embalses/agua?id=" + id);
    const getPrediccion = async (id) => await get("/embalses/predict?id=" + id);

    return (
        <RecevoirContext.Provider value={{
            showPredict,
            setShowPredict,
            getPrediccion,
            getEmbalses,
            getAguaFromEmbalses
        }}>
            {children}
        </RecevoirContext.Provider>
    );
}

export const useRecevoir = () => useContext(RecevoirContext);