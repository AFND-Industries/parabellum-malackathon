export default function HomePage(){

    return <>
        <main className="container">
            <div className="row g-3">
                <div className="col-6">
                    <button className="btn btn-primary w-100 h-100">
                        Usar tu ubicación
                    </button>
                </div>
                <div className="col-6">
                    <button className="btn btn-outline-primary w-100">
                        Seleccionar otra ubicación
                    </button>
                </div>
            </div>
        </main>
    </>
}