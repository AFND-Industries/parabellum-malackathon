import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import PredictModal from "../components/PredictModa";

export default function HomePage() {
    const [actualLocation, setActualLocation] = useState([36.715103, -4.477658]);
    const [radio, setRadio] = useState(100);
    const [mapKey, setMapKey] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        if (navigator.webdriver) {
            alert("Acceso denegado: posible scraping detectado.");
            navigate('/recaptcha');
        }

        const refreshCount = localStorage.getItem('refreshCount') || 0;
        if (refreshCount >= 3) {
            navigate('/recaptcha');
        } else {
            localStorage.setItem('refreshCount', parseInt(refreshCount) + 1);
        }

        const resetRefreshCount = () => {
            localStorage.setItem('refreshCount', 0);
        };
        const timer = setTimeout(resetRefreshCount, 10000);

        return () => {
            clearTimeout(timer);
        };
    }, [navigate]);

    // useEffect para escuchar cambios en actualLocation
    useEffect(() => {
        setMapKey(prevKey => prevKey + 1); // Forzar la re-renderización
    }, [actualLocation]);

    // Manejar la actualización de ubicación con validación
    const handleActualLocation = (lat, lon) => {
        const parsedLat = parseFloat(lat);
        const parsedLon = parseFloat(lon);
        if (!isNaN(parsedLat) && !isNaN(parsedLon)) {
            setActualLocation([parsedLat, parsedLon]);
        }
    };

    return (
        <>
            <main className="container mb-3">
                <h1 className="fw-bold text-center">Buscador de embalses</h1>
                <p className="text-justify">
                    Nuestra aplicación te permitirá buscar información detallada sobre los embalses cercanos a tu ubicación actual, o la
                    ubicación que tu elijas. Para empezar, introduce la latitud y longitud de una ubicación o pulsa "Usar mi ubicación", y después
                    pulsa en "Ver embalses a 100km de ti". Si quieres ver más embalses, cambia la ubicación o amplía el radio de búsqueda.
                </p>
                <div className="row g-3">
                    <div className="col-md-6 col-12">
                        <MapComponent key={mapKey} latitude={actualLocation[0]} longitude={actualLocation[1]} />
                    </div>
                    <div className="col-md-6 col-12">
                        <b>Coordenadas</b>
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className="mb-3">
                                    <label htmlFor="latInput" className="form-label">Latitud:</label>
                                    <input
                                        id="latInput"
                                        value={actualLocation[0]}
                                        onChange={(e) => handleActualLocation(e.target.value, actualLocation[1])}
                                        className="form-control"
                                        type="number"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="mb-3">
                                    <label htmlFor="longInput" className="form-label">Longitud:</label>
                                    <input
                                        id="longInput"
                                        value={actualLocation[1]}
                                        onChange={(e) => handleActualLocation(actualLocation[0], e.target.value)}
                                        className="form-control"
                                        type="number"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="radiusInput" className="form-label">Radio (en kilómetros):</label>
                            <input
                                id="radiusInput"
                                min={1}
                                value={radio}
                                onChange={(v) => setRadio(v.currentTarget.valueAsNumber)}
                                className="form-control"
                                type="number"
                            />
                        </div>
                        <button className="btn btn-outline-secondary" onClick={() => {
                            navigator.geolocation.getCurrentPosition((position) => {
                                setActualLocation([position.coords.latitude, position.coords.longitude]);
                            });
                        }}>
                            Usar mi ubicación
                        </button>
                    </div>
                    <div className="col-12">
                        Ubicación seleccionada {"["}Latitud: {actualLocation[0]}{", "}Longitud: {actualLocation[1]}{"]"}
                    </div>
                    <div className="col-2"></div>
                    <div className="col-8">
                        <button onClick={() => {
                            navigate("/result", { state: { latitude: actualLocation[0], longitude: actualLocation[1], radius: radio } });
                        }} className="btn btn-success w-100">
                            Ver embalses a {radio}km de ti
                        </button>
                    </div>
                    <div className="col-2"></div>
                </div>
            </main>
        </>
    );
}
