import { useNavigate } from "react-router-dom";

export default function RecevoirItemComponent(props) {

    const { recevoir } = props;
    const navigate = useNavigate();

    return <div className="col-lg-3 col-md-4 col-sm-6 col-12">
        <div className="card h-100">
            <div className="card-body">
                <div className="row g-2">
                    <div className="col-12">
                        <h4 className="fs-5 fw-bold mb-0">{recevoir.NOMBRE} · <span style={{ color: "gray" }}>{recevoir.AGUA_TOTAL} m³</span></h4>
                    </div>
                    <div className="col-12 h-100">
                        <h5 className="fs-6 mb-0" style={{ color: "gray" }}>{recevoir.AMBITO_NOMBRE[0] + recevoir.AMBITO_NOMBRE.toLowerCase().substring(1)}</h5>
                    </div>
                    <div className="col-12 d-flex align-items-end h-100">
                        <button onClick={() => navigate("/recevoir", { state: recevoir })} className="btn btn-primary" style={{ fontSize: "1ch" }}>Más información</button>
                    </div>
                </div>
            </div>
        </div>

    </div>;
}