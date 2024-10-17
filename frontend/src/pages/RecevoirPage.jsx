import { useEffect, useState } from "react";
import { useRecevoir } from "../context/RecevoirContext";
import RecevoirChart from "../components/RecevoirChart";
import MapComponent from "../components/MapComponent";
import { useLocation, useNavigate } from "react-router-dom";

export default function RecevoirPage() {
    const { getAguaFromEmbalses, setShowPredict, showPredict } = useRecevoir();

    const location = useLocation();
    const navigate = useNavigate();
    const recevoir = location.state.recevoir;
    const radius = location.state.radius;

    const [aguas, setAguas] = useState(undefined);
    const [metrics, setMetrics] = useState({
        loaded: false,
        max: {
            value: 0,
            date: undefined,
        },
        min: {
            value: 0,
            date: undefined,
        },
        mean: 0
    });

    function groupByYearAndSum(aguas) {
        return aguas.reduce((acc, agua) => {
            const year = new Date(agua.FECHA).getFullYear();
            if (!acc[year]) {
                acc[year] = { total: 0, count: 0 };
            }
            acc[year].total += agua.AGUA_ACTUAL; // Sumar el nivel de agua
            acc[year].count += 1; // Contar las lecturas
            return acc;
        }, {});
    }

    function getMaximo(aguas) {
        const grouped = groupByYearAndSum(aguas);
        let max = { value: -Infinity, date: undefined };

        for (const year in grouped) {
            if (grouped[year].total > max.value) {
                max = { value: grouped[year].total, date: year };
            }
        }
        return max;
    }

    function getMinimo(aguas) {
        const grouped = groupByYearAndSum(aguas);
        let min = { value: Infinity, date: undefined };

        for (const year in grouped) {
            if (grouped[year].total < min.value) {
                min = { value: grouped[year].total, date: year };
            }
        }
        return min;
    }

    function getMedia(aguas) {
        const grouped = groupByYearAndSum(aguas);
        const totalSuma = Object.values(grouped).reduce((acc, yearData) => acc + yearData.total, 0);
        const totalCount = Object.keys(grouped).length;
        return totalCount ? totalSuma / totalCount : 0; // Evitar división por cero
    }

    useEffect(() => {
        async function fetch() {
            const aguas_request = await getAguaFromEmbalses(recevoir.ID);
            const aguas = aguas_request.data;

            const max = getMaximo(aguas);
            const min = getMinimo(aguas);
            const mean = getMedia(aguas);

            setAguas(aguas);
            setMetrics({
                loaded: true,
                max: max,
                min: min,
                mean: mean
            });
        }

        fetch();
    }, []);

    const predict = () => {
        setShowPredict(recevoir.ID);
    }

    const volver = () => {
        navigate("/result", { state: { latitude: recevoir.X, longitude: recevoir.Y, radius: radius } });
    }

    return (
        <div className="container">
            <button className="btn btn-primary" onClick={volver}>Volver</button>
            <h1 className="text-center fw-bold">{recevoir.EMBALSE}</h1>
            <h2 className="text-center mb-5 fs-3">
                Información sobre el embalse
            </h2>

            <div className="d-flex row g-3 mb-4 align-items-stretch">
                <div className="col-md-12 d-flex flex-column text-center">
                    <div className="info-card p-3 border rounded shadow-sm h-100">
                        <div className="flex-grow-1">
                            <MapComponent latitude={recevoir.X} longitude={recevoir.Y} />
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="info-card p-3 border rounded shadow-sm h-100">
                        <h2 className="mb-3">Detalles del Embalse</h2>
                        <div className="row">
                            <div className="col-md-6">
                                <p><strong>Tipo:</strong> {recevoir.TIPO}</p>
                                <p><strong>Comunidad Autónoma:</strong> {recevoir.CCAA}</p>
                                <p><strong>Provincia:</strong> {recevoir.PROVINCIA}</p>
                            </div>

                            <div className="col-md-6">
                                <p><strong>Ámbito:</strong> {recevoir.AMBITO_NOMBRE}</p>
                                <p><strong>Cauce:</strong> {recevoir.CAUCE}</p>
                                <p><strong>Capacidad del embalse:</strong> {recevoir.AGUA_TOTAL}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mt-3">
                                {recevoir.GOOGLE && (
                                    <a href={recevoir.GOOGLE} target="_blank" rel="noopener noreferrer" className="btn btn-secondary me-2">
                                        Google
                                    </a>
                                )}
                                {recevoir.OPENSTREETMAP && (
                                    <a href={recevoir.OPENSTREETMAP} target="_blank" rel="noopener noreferrer" className="btn btn-secondary me-2">
                                        Open Street Map
                                    </a>
                                )}
                                {recevoir.INFORME && (
                                    <a href={recevoir.INFORME} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                        Ver informe
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="row mb-4" style={{ display: metrics.loaded ? "flex" : "none" }}>
                <div className="col-md-4">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Máximo nivel de agua ({metrics.max.date})</h5>
                            <p className="card-text">{metrics.max.value}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Mínimo nivel de agua ({metrics.min.date})</h5>
                            <p className="card-text">{metrics.min.value}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Nivel de agua medio</h5>
                            <p className="card-text">{metrics.mean.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center align-items-start flex-column">
                <div className="d-flex justify-content-between align-items-center w-100">
                    <div>
                        <h2>Evolución del agua</h2>
                    </div>
                    <div>
                        <button className="btn btn-secondary" onClick={predict}>Realizar predicción de 12 meses</button>
                    </div>

                </div>
                <RecevoirChart aguas={aguas} />
            </div>
        </div >
    );
}
