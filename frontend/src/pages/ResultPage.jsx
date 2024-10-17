import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { useRecevoir } from "../context/RecevoirContext";
import RecevoirItemComponent from "../components/RecevoirItemComponent";

export default function ResultPage(){
    const location = useLocation();
    const recContext = useRecevoir();
    const {latitude,longitude,radius} = location.state || {};

    const navigate = useNavigate();

    const [recevoirs, setRecevoirs] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try{
                const recs = (await recContext.getEmbalses(latitude, longitude, radius));
                console.log(recs);
                setRecevoirs(recs.data);
            } catch(e){
                setRecevoirs([])
            }
            
        }
        if(!latitude || !longitude || !radius) navigate("/");
        else fetchData();
    }, [])


    return <>
        {
            recevoirs === null ?
                <div className="text-center">
                    <span className="fw-bold">Cargando embalses</span><br></br>
                    <div className="spinner-grow" role="status"></div>
                </div>
            :
            recevoirs.length === 0 ?
                <div className="text-center">
                    <h3>No se han encontrado embalses a {radius}km</h3>
                </div> : 
                <div className="container">
                    <div className="row g-3">
                    <div className="col-12 text-center">
                        <h3>Aquí tienes algunos embalses a {radius}km de distancia</h3>
                    </div>
                    {recevoirs.map(recevoir => <RecevoirItemComponent recevoir={recevoir} />)}
                </div>
                </div>
                
        }
    </>
}