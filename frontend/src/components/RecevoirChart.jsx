import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function RecevoirChart({ aguas }) {
    if (aguas === undefined || aguas === null) return null;

    // Ordenar las lecturas y agruparlas por año
    const datosOrdenados = aguas.map(item => ({
        fecha: new Date(item.FECHA), // Mantener como objeto Date
        aguaActual: item.AGUA_ACTUAL,
    })).sort((a, b) => a.fecha - b.fecha); // Ordenar directamente con el objeto Date

    const datosAgrupados = datosOrdenados.reduce((acc, item) => {
        const year = item.fecha.getFullYear();
        if (!acc[year]) {
            acc[year] = { fecha: item.fecha, aguaActual: 0 };
        }
        acc[year].aguaActual += item.aguaActual; // Sumar el nivel de agua
        return acc;
    }, {});

    // Convertir el objeto agrupado a un array
    const datosFinales = Object.values(datosAgrupados);

    if (!datosFinales.length) return null;

    // Preparar los datos para Chart.js
    const chartData = {
        labels: datosFinales.map(item => item.fecha.toLocaleDateString('es-ES', { year: 'numeric' })), // Solo el año para las etiquetas
        datasets: [
            {
                label: 'Agua por año',
                data: datosFinales.map(item => item.aguaActual), // Agua actual en el eje Y
                borderColor: '#8884d8',
                backgroundColor: 'rgba(136, 132, 216, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                mode: 'nearest', // Cambia a 'nearest' para tooltip más cercano
                intersect: false, // Cambia a false para permitir que el tooltip se muestre sin tener que estar justo sobre el punto
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
                    text: 'Año',
                },
                ticks: {
                    autoSkip: true, // Opción para saltar etiquetas si se superponen
                    maxTicksLimit: 10, // Límite de etiquetas a mostrar
                },
            },
            y: {
                title: {
                    display: false,
                    text: 'Agua',
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
