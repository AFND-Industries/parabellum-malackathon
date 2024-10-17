import { useEffect, useState } from "react";
import { useRecevoir } from "../context/RecevoirContext"

export default function RecevoirPage() {
    const { getEmbalses, getAguaFromEmbalses } = useRecevoir();

    const [aguas, setAguas] = useState(undefined);
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



    useEffect(() => {
        async function perita() {
            const aguas_request = await getAguaFromEmbalses(recevoir.ID);
            const aguas = aguas_request.data;

            setAguas(aguas);
        }
        perita();
    }, []);

    useEffect(() => {
        console.log(aguas);
    }, [aguas]);

    return (
        <div className="d-flex justify-content-center align-items-center">
            <h1>Embalses</h1>
        </div>
    )
}