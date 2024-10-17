import { useEffect, useState } from "react";
import { useRecevoir } from "../context/RecevoirContext"
import PrediccionChart from "./PredictComponent";

export default function PredictModal() {

    const { showPredict, setShowPredict, getPrediccion } = useRecevoir();
    const [prediccion, setPrediccion] = useState(undefined);

    useEffect(() => {
        const pred = async (id) => {
            console.log(id);
            const data = await getPrediccion(id);
            setPrediccion(data.data);
        }

        if (showPredict)
            pred(showPredict);

    }, [showPredict])

    return (
        <>
            {showPredict && (
                <div className={'d-flex align-items-start justify-content-center position-fixed w-100 h-100'}
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 10000, overflowY: 'auto', overflowX: "hidden" }}>
                    <div className="bg-white mt-5 card rounded-5" style={{ width: "80%", height: "80%" }}>
                        <div className="d-flex justify-content-between align-items-center p-3">
                            <h2>Predicción de 12 meses</h2>
                            <button className="btn btn-secondary" onClick={() => setShowPredict(undefined)}>Cerrar</button>
                        </div>
                        <div className="d-flex justify-content-center align-items-center" style={{ height: "calc(100% - 70px)" }}>
                            <div style={{ width: "80%", height: "80%" }}>
                                <PrediccionChart prediccion={prediccion} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
