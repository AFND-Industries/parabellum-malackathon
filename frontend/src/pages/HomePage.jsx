import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import PredictModal from "../components/PredictModa";

export default function HomePage() {
    const [actualLocation, setActualLocation] = useState([36.715103, -4.477658]);
    const [inputMethod, setInputMethod] = useState("name");
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
            <main className="container">
                <div className="row g-3">
                    <div className="col-6">
                        <MapComponent key={mapKey} latitude={actualLocation[0]} longitude={actualLocation[1]} />
                    </div>
                    <div className="col-6">
                        <p>Datos de la ubicación</p>
                        <div>
                            <input className="form-check-input me-2" type="radio" onChange={() => setInputMethod("name")} id="nameRadio" checked={inputMethod === "name"} />
                            <label className="form-check-label" htmlFor="nameRadio">Nombre</label>
                        </div>
                        <div className="mb-3">
                            <input className="form-check-input me-2" type="radio" onChange={() => setInputMethod("coords")} id="coordsRadio" checked={inputMethod === "coords"} />
                            <label className="form-check-label" htmlFor="coordsRadio">Coordenadas</label>
                        </div>
                        {inputMethod === "name" ? (
                            <div className="mb-3">
                                <label htmlFor="locationInput" className="form-label">Ubicación</label>
                                <input id="locationInput" className="form-control" type="search" />
                            </div>
                        ) : (
                            <div className="row">
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="latInput" className="form-label">Latitud</label>
                                        <input
                                            id="latInput"
                                            value={actualLocation[0]}
                                            onChange={(e) => handleActualLocation(e.target.value, actualLocation[1])}
                                            className="form-control"
                                            type="number"
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="longInput" className="form-label">Longitud</label>
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
                        )}

                        <div className="mb-3">
                            <label htmlFor="radiusInput" className="form-label">Radio</label>
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
                        Ubicación seleccionada<br />
                        Latitud: {actualLocation[0]} <br />
                        Longitud: {actualLocation[1]}
                    </div>
                    <div className="col-2"></div>
                    <div className="col-8">
                        <button onClick={() => {
                            navigate("/result", { state: { latitude: actualLocation[0], longitude: actualLocation[1], radius: radio } });
                        }} className="btn btn-primary w-100">
                            Ver embalses a {radio}km de ti
                        </button>
                    </div>
                    <div className="col-2"></div>
                </div>
            </main>
        </>
    );
}
