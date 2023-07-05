import { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler);

export const ChartTareas = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Tareas',
        data: [],
        backgroundColor: ['#84A98C', '#F0C987', '#DB7F86', '#5C6F7C', '#8DA7BE'],
      },
    ],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tareas'); // Cambia la URL a tu endpoint de API para obtener las tareas
      const data = response.data;

      // Crea un objeto para contar las tareas por persona
      const tareasPorPersona = {};

      data.forEach((tarea) => {
        const persona = tarea.persona;

        if (!tareasPorPersona[persona]) {
          tareasPorPersona[persona] = 1;
        } else {
          tareasPorPersona[persona] += 1;
        }
      });

      const personas = Object.keys(tareasPorPersona);
      const tareas = Object.values(tareasPorPersona);

      setChartData((prevData) => ({
        ...prevData,
        labels: personas,
        datasets: [
          {
            ...prevData.datasets[0],
            data: tareas,
          },
        ],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return <Doughnut data={chartData} />;
};
