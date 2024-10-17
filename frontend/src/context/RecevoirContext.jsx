import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios";

const RecevoirContext = createContext(null);
const SERVER_URL = "http://malackathon.yellowbeavers.com:6996"; // CAMBIAR A LOCALHOST EN EL SV

export const RecevoirProvider = ({ children }) => {

    const [showPredict, setShowPredict] = useState(undefined);

    const get = async (url) => await axios.get(SERVER_URL + url);
    const post = async (url, parameters) => await axios.post(SERVER_URL + url, parameters);

    const getEmbalses = async (x, y, radius) => await get("/api/embalses?x=" + x + "&y=" + y + "&radius=" + radius);
    const getAguaFromEmbalses = async (id) => await get("/api/embalses/" + id + "/agua");
    const getPrediccion = async (id) => await get("/api/embalses/" + id + "/predict");

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