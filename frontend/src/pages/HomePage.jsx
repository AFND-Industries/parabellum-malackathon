
import { act, useState } from "react";
import HeaderPage from "../components/HeaderComponent.jsx";
export default function HomePage() {
  const [actualLocation, setActualLocation] = useState([36.715103, -4.477658]);

  const navigate = useNavigate();

    useEffect(() => {
        // Detección de webdriver
        if (navigator.webdriver) {
            alert("Acceso denegado: posible scraping detectado.");
            navigate('/recaptcha'); // Cambia a la ruta que desees
        }
    }, [navigate]);

  return (
    <>
      <main className="container">
        <div className="row g-3">
          <div className="col-6">{"<mapa>"}</div>
          <div className="col-6">
            <div className="mb-3">
              <label for="locationInput" className="form-label">
                Ubicación
              </label>
              <input
                id="locationInput"
                className="form-control"
                type="search"
              ></input>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                navigator.geolocation.getCurrentPosition((position) => {
                  setActualLocation([
                    position.coords.latitude,
                    position.coords.longitude,
                  ]);
                });
              }}
            >
              Usar mi ubicación
            </button>
          </div>
          <div className="col-12"></div>
          Ubicación seleccionada: {actualLocation}
        </div>
      </main>
    </>
  );
}
