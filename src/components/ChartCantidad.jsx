import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export const ChartCantidad = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Reservas',
        data: [],
        tension: .5,
        fill: true,
        borderColor: 'rgb(255, 255, 255)',
        backgroundColor: '#84A98C',
        pointRadius: 5,
        pointBorderColor: '#84A98C',
        pointBackgroundColor: 'rgba(255, 255, 255)',
      },
    ],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/reservas'); // Cambia la URL a tu endpoint de API de MongoDB
      const data = response.data;

      // Obtén un conjunto completo de meses
      const meses = getAllMonths();

      // Crea un objeto para contar las reservas por mes
      const reservasPorMes = {};

      data.forEach((item) => {
        const monthYear = formatDate(item.fechaIngreso);

        if (!reservasPorMes[monthYear]) {
          reservasPorMes[monthYear] = 1;
        } else {
          reservasPorMes[monthYear] += 1;
        }
      });

      const labels = meses.map((monthYear) => monthYear);
      const reservas = meses.map((monthYear) => reservasPorMes[monthYear] || 0);

      setChartData((prevData) => ({
        ...prevData,
        labels: labels,
        datasets: [
          {
            ...prevData.datasets[0],
            data: reservas,
          },
        ],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "";
    }
    const month = date.toLocaleString('default', { month: 'long' });
    return `${month} ${date.getFullYear()}`;
  };

  const getAllMonths = () => {
    const months = [];
    const startDate = new Date("2023-05-01"); // Cambia la fecha de inicio según tus necesidades
    const endDate = new Date("2024-05-31"); // Cambia la fecha de finalización según tus necesidades

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const monthYear = formatDate(currentDate);
      months.push(monthYear);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return months;
  };

  return <Line data={chartData} />;
};
