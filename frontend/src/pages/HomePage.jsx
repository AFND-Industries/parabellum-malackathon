import { act, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import HeaderPage from "../components/HeaderComponent";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

    const [actualLocation, setActualLocation] = useState([36.715103, -4.477658]);
    const [inputMethod, setInputMethod] = useState("name");
    const [radio, setRadio] = useState(100);

    const navigate = useNavigate()

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