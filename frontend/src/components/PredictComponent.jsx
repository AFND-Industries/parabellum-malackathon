import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function PrediccionChart({ prediccion }) {
    if (prediccion === undefined || prediccion === null) return null;

    // Preparar los datos para Chart.js
    const chartData = {
        labels: prediccion.map(item => {
            const month = new Date(0, item.mes - 1).toLocaleString('es-ES', { month: 'long' });
            return month.charAt(0).toUpperCase() + month.slice(1); // Capitalizar la primera letra
        }), // Nombres de los meses
        datasets: [
            {
                label: 'Predicción Mensual',
                data: prediccion.map(item => item.prediccion), // Predicciones en el eje Y
                borderColor: 'blue',
                backgroundColor: 'rgba(66, 135, 245, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                mode: 'nearest',
                intersect: false,
            },
            legend: {
                display: true,
                position: 'top',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Mes',
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 12,
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Predicción',
                },
            },
        },
    };

    return (
        <div style={{ width: "100%", height: "400px" }}>
            <Line data={chartData} options={{ ...options, maintainAspectRatio: false }} />
        </div>
    );
}
