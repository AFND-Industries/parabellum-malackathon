

import { act, useState, useEffect } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import HeaderPage from "../components/HeaderComponent";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

    const [actualLocation, setActualLocation] = useState([36.715103, -4.477658]);
    const [inputMethod, setInputMethod] = useState("name");
    const [radio, setRadio] = useState(100);
    const [refreshCount, setRefreshCount] = useState(0);

    const navigate = useNavigate()

    useEffect(() => {
        // Detección de webdriver
        if (navigator.webdriver) {
            alert("Acceso denegado: posible scraping detectado.");
            navigate('/recaptcha'); // Cambia a la ruta que desees
        }

        const refreshCount = localStorage.getItem('refreshCount') || 0;

        // Si el número de recargas excede 5, redirigir al CAPTCHA
        if (refreshCount >= 3) {
            navigate('/recaptcha'); // Cambia esto a tu ruta de CAPTCHA
        } else {
            // Incrementar el contador de recargas
            localStorage.setItem('refreshCount', parseInt(refreshCount) + 1);
        }

        // Reiniciar el contador después de 10 segundos
        const resetRefreshCount = () => {
            localStorage.setItem('refreshCount', 0);
        };
        const timer = setTimeout(resetRefreshCount, 10000); // 10000 ms = 10 segundos

        return () => {
            clearTimeout(timer); // Limpiar el temporizador
        };
    }, [navigate]);

    return <>
        <main className="container">
            <div className="row g-3">
                <div className="col-6">
                    {"<mapa>"}
                </div>
                <div className="col-6">
                    <p>Datos de la ubicación</p>
                    <div>
                        <input class="form-check-input me-2" type="radio" onChange={(_) => setInputMethod("name")} id="nameRadio" checked={inputMethod === "name"} />
                        <label class="form-check-label" for="nameRadio">
                            Nombre
                        </label>
                    </div>
                    <div className="mb-3">
                        <input class="form-check-input me-2" type="radio" onChange={(_) => setInputMethod("coords")} id="coordsRadio" checked={inputMethod === "coords"} />
                        <label class="form-check-label" for="coordsRadio">
                            Coordenadas
                        </label>
                    </div>
                    {
                        inputMethod === "name" ?
                            <div className="mb-3">
                                <label for="locationInput" className="form-label">Ubicación</label>
                                <input id="locationInput" className="form-control" type="search"></input>
                            </div> :
                            <div className="row">
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label for="locationInput" className="form-label">Latitud</label>
                                        <input id="locationInput" value={actualLocation[0]} onChange={(v) => setActualLocation([v.target.valueAsNumber,actualLocation[1]])} className="form-control" type="number"></input>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label for="locationInput" className="form-label">Longitud</label>
                                        <input id="locationInput" value={actualLocation[1]} onChange={(v) => setActualLocation([actualLocation[0],v.target.valueAsNumber])} className="form-control" type="number"></input>
                                    </div>
                                </div>
                            </div>
                    }

                    <div className="mb-3">
                        <label for="locationInput" className="form-label">Radio</label>
                        <input id="locationInput" min={1} value={radio} onChange={(v) => setRadio(v.currentTarget.valueAsNumber)} className="form-control" type="number"></input>
                    </div>
                    <button className="btn btn-outline-secondary" onClick={() => {
                        navigator.geolocation.getCurrentPosition((position) => {
                            setActualLocation([position.coords.latitude, position.coords.longitude])
                        })
                    }}>Usar mi ubicación</button>
                </div>
                <div className="col-12">
                    Ubicación seleccionada<br /> 
                    Latitud: {actualLocation[0]} <br />
                    Longitud: {actualLocation[1]}
                </div>
                <div className="col-2"></div>
                <div className="col-8">
                    <button onClick={() => {
                        navigate("/result", {state: {latitude: actualLocation[0], longitude: actualLocation[1], radius: radio}})
                    }} className="btn btn-primary w-100">Ver embalses a {radio}km de ti</button>
                </div>
                <div className="col-2"></div>

            </div>
        </main>
    </>
}