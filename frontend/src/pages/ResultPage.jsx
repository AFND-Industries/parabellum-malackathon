import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { useRecevoir } from "../context/RecevoirContext";
import RecevoirItemComponent from "../components/RecevoirItemComponent";

export default function ResultPage() {
    const location = useLocation();
    const recContext = useRecevoir();
    const { latitude, longitude, radius } = location.state || {};

    const navigate = useNavigate();

    const [name, setName] = useState("c")
    const [capacity, setCapacity] = useState(10)
    const [hydroelectric, setHydroelectric] = useState(null)
    const [cuenca, setCuenca] = useState("")

    const [recevoirs, setRecevoirs] = useState(null)
    const filters = [
        {
            filterName: "name",
            reachableName: "Nombre: ",
            filterValue: name,
            constraint: (value) => !name || name.length === 0 || value.EMBALSE.toLowerCase().includes(name.toLowerCase())
        },
        {
            filterName: "capacity",
            reachableName: "Capacidad mayor que ",
            filterValue: capacity,
            constraint: (value) => !capacity || Number(value.AGUA_TOTAL) >= capacity
        },
        {
            filterName: "cuenca",
            reachableName: "Cuenca: ",
            filterValue: cuenca,
            constraint: (value) => !cuenca || cuenca.length === 0 || value.AMBITO_NOMBRE.toLowerCase().includes(cuenca.toLowerCase())
        },
        {
            filterName: "hydroelectric",
            reachableName: "Tiene central hidroeléctrica",
            filterValue: hydroelectric,
            constraint: (value) => !hydroelectric || value.ELECTRICO_FLAG
        }
    ]

    const applyFilters = () => {
        return recevoirs.filter((v) => filters.every((f) => f.constraint(v)));
    }

    const [f, setF] = useState(undefined);
    async function fase() {
        console.log("asd");
        try {
            const recs = (await recContext.getEmbalses(latitude, longitude, radius)).data;

            const updatedRecevoirs = await Promise.all(recs.map(async (recevoir) => {
                try {
                    const predicciones = (await recContext.getPrediccion(recevoir.ID)).data;

                    // Calcular la media de las predicciones
                    const media = predicciones.reduce((acumulador, item) => acumulador + item.prediccion, 0);
                    console.log(media);
                    // Añadir la media como un campo adicional al embalse
                    return { ...recevoir, MEDIA_PREDICCION: media };
                } catch (e) {
                    console.error("Error al obtener la predicción para el embalse:", recevoir.ID);
                    return { ...recevoir, MEDIA_PREDICCION: null };
                }
            }));
            console.log(updatedRecevoirs);
            setF(updatedRecevoirs);
        } catch (e) {
            setF(undefined);
        }
    }


    useEffect(() => {
        async function fetchData() {
            try {
                const recs = (await recContext.getEmbalses(latitude, longitude, radius)).data;

                setRecevoirs(recs);
            } catch (e) {
                setRecevoirs([]);
            }
        }

        if (!latitude || !longitude || !radius) navigate("/");
        else fetchData();
    }, [latitude, longitude, radius, navigate, recContext]);

    const volver = () => {
        navigate("/");
    }
    console.log(f);
    const mayor = f === undefined ? undefined : f.reduce((max, current) => {
        return current.MEDIA_PREDICCION > max.MEDIA_PREDICCION ? current : max;
    }, f[0]);

    // Encontrar el elemento con la menor MEDIA_PREDICCION
    const menor = f === undefined ? undefined : f.reduce((min, current) => {
        return current.MEDIA_PREDICCION < min.MEDIA_PREDICCION ? current : min;
    }, f[0]);

    return (
        <>
            {
                recevoirs === null ?
                    <div className="text-center">
                        <span className="fw-bold">Cargando embalses</span><br></br>
                        <div className="spinner-grow" role="status"></div>
                    </div>
                    :
                    recevoirs.length === 0 ?
                        <>
                            <div className="container">
                                <button className="btn btn-primary" onClick={volver}>Volver</button>
                                <div className="text-center">
                                    <h3>No se han encontrado embalses a {radius}km</h3>
                                </div>
                            </div>
                        </>
                        :
                        <div className="container">
                            <button className="btn btn-primary" onClick={volver}>Volver</button>
                            <div className="row g-3">
                                <div className="col-12 text-center">
                                    <h3>Aquí tienes algunos embalses a {radius}km de distancia</h3>
                                </div>
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            Filtros utilizados
                                        </div>
                                        <div className="card-body d-flex">
                                            {filters.map((f) => {
                                                return <div key={f.filterName}>
                                                    <span className="badge rounded-pill text-bg-primary me-2">{f.reachableName}
                                                        {
                                                            f.filterName === "hydroelectric" ?
                                                                <input id={f.filterName + "Input"} type="checkbox" onChange={() => { setHydroelectric(!hydroelectric) }} className="form-check-input ms-2" checked={f.filterValue} />
                                                                :
                                                                <input id={f.filterName + "Input"} onChange={(v) => {
                                                                    switch (f.filterName) {
                                                                        case "name":
                                                                            setName(v.target.value)
                                                                            break;
                                                                        case "capacity":
                                                                            setCapacity(v.target.valueAsNumber)
                                                                            break;
                                                                        case "cuenca":
                                                                            setCuenca(v.target.value)
                                                                            break;
                                                                        default:
                                                                            break;
                                                                    }
                                                                }} type={f.filterName === "capacity" ? "number" : "text"} min={f.filterName === "capacity" ? 0 : ""} style={{ maxWidth: "50px", border: "none", borderRadius: "5px" }} value={f.filterValue} />
                                                        }
                                                    </span>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                                {applyFilters().map(recevoir => <RecevoirItemComponent key={recevoir.ID} radius={radius} recevoir={recevoir} />)}
                                <div style={{ display: "none" }}>
                                    <button className="btn btn-primary" onClick={fase}>Fase 5</button>
                                    {f && <div>
                                        {mayor} le pasa agua a {menor}
                                    </div>}
                                </div>
                            </div>
                        </div>
            }
        </>
    );
}
