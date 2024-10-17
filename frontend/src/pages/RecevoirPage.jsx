import { useEffect, useState } from "react";
import { useRecevoir } from "../context/RecevoirContext";
import RecevoirChart from "../components/RecevoirChart";
import MapComponent from "../components/MapComponent";

export default function RecevoirPage() {
    const { getAguaFromEmbalses } = useRecevoir();

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

    const recevoir = {
        "ID": 42,
        "AMBITO_NOMBRE": "JÚCAR",
        "EMBALSE_NOMBRE": "ULLDECONA",
        "AGUA_TOTAL": 11,
        "ELECTRICO_FLAG": false,
        "ID_EMBALSE": 42,
        "CODIGO": 8120011,
        "NOMBRE": "ULLDECONA",
        "EMBALSE": "Ulldecona Dam",
        "X": 40.670915209,
        "Y": 0.233962578000046,
        "DEMARC": "JUCAR",
        "CAUCE": "RIU DE LA SÉNIA",
        "GOOGLE": null,
        "OPENSTREETMAP": null,
        "WIKIDATA": "https://www.wikidata.org/wiki/Q202052",
        "PROVINCIA": "Castelló/Castellón",
        "CCAA": "Comunitat Valenciana",
        "TIPO": "Presa de fábrica de gravedad (hormigón vibrado)",
        "COTA_CORON": "479.029999999999",
        "ALT_CIMIEN": "58.6599999999999",
        "INFORME": "https://sig.mapama.gob.es/WebServices/clientews/snczi/Default.aspx?nombre=EGISPE_PRESA&claves=ID_INFRAESTRUCTURA&valores=2266"
    }

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

    return (
        <div className="container my-5">
            <div className="d-flex row g-3 mb-4 align-items-stretch">
                <div className="col-md-7 d-flex flex-column text-center">
                    <div className="info-card p-3 border rounded shadow-sm h-100">
                        <h2 className="mb-3"><strong>{recevoir.EMBALSE}</strong></h2>
                        <div className="flex-grow-1">
                            <MapComponent latitude={recevoir.X} longitude={recevoir.Y} />
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="info-card p-3 border rounded shadow-sm h-100">
                        <h2 className="mb-3">Detalles del Embalse</h2>
                        <p><strong>Tipo:</strong> {recevoir.TIPO}</p>
                        <p><strong>Comunidad Autónoma:</strong> {recevoir.CCAA}</p>
                        <p><strong>Provincia:</strong> {recevoir.PROVINCIA}</p>
                        <p><strong>Ámbito:</strong> {recevoir.AMBITO_NOMBRE}</p>
                        <p><strong>Cauce:</strong> {recevoir.CAUCE}</p>
                        <p><strong>Capacidad del embalse:</strong> {recevoir.AGUA_TOTAL}</p>

                        <div className="mt-3">
                            {recevoir.GOOGLE && (
                                <a href={recevoir.GOOGLE} target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2">
                                    Google Maps
                                </a>
                            )}
                            {recevoir.OPENSTREETMAP && (
                                <a href={recevoir.OPENSTREETMAP} target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2">
                                    Open Street Map
                                </a>
                            )}
                            {recevoir.INFORME && (
                                <a href={recevoir.INFORME} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    Informe
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>



            <div className="row mb-4" style={{ display: metrics.loaded ? "flex" : "none" }}>
                <div className="col-md-4">
                    <div className="card text-white bg-secondary mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Máximo nivel de agua ({metrics.max.date})</h5>
                            <p className="card-text">{metrics.max.value}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-secondary mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Mínimo nivel de agua ({metrics.min.date})</h5>
                            <p className="card-text">{metrics.min.value}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-secondary mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Nivel de agua medio</h5>
                            <p className="card-text">{metrics.mean.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center align-items-start flex-column">
                <h2>Evolución del agua</h2>
                <RecevoirChart aguas={aguas} />
            </div>
        </div>
    );
}
