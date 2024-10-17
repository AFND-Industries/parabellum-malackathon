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

    useEffect(() => {
        async function fetchData() {
            try {
                const recs = (await recContext.getEmbalses(latitude, longitude, radius));
                console.log(recs);
                setRecevoirs(recs.data);
            } catch (e) {
                setRecevoirs([])
            }

        }
        if (!latitude || !longitude || !radius) navigate("/");
        else fetchData();
    }, [])

    const volver = () => {
        navigate("/");
    }


    return <>

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
                                            return <div>
                                                <span class="badge rounded-pill text-bg-primary me-2">{f.reachableName}
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
                                <div className="d-flex">

                                </div>
                            </div>
                            {applyFilters().map(recevoir => <RecevoirItemComponent key={recevoir.ID} radius={radius} recevoir={recevoir} />)}
                        </div>
                    </div>
        }
    </>
}