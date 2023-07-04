import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChartLine } from './ChartLine';

export const PanelHome = () => {
  const [reservas, setReservas] = useState([]);
  const [bungalowFechaMasCercana, setBungalowFechaMasCercana] = useState('');
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    obtenerReservas();
    obtenerTareas();
  }, []);
//RESERVAS
  const obtenerReservas = () => {
    axios.get('http://localhost:3000/reservas')
      .then(response => {
        setReservas(response.data);
        setBungalowFechaMasCercana(obtenerBungalowFechaMasCercana(response.data));
      })
      .catch(error => console.error('Error al obtener las reservas:', error));
  };
//TAREAS
  const obtenerTareas = () => {
    axios.get('http://localhost:3000/tareas')
      .then(response => {
        setTareas(response.data.slice(0, 3)); // Mostrar solo las primeras 2 tareas
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error al obtener las tareas:', error);
      });
  };

// Función para formatear una fecha en formato dd/mm/aaaa
function formatearFecha(fecha) {
  // Obtener la diferencia horaria en minutos entre el cliente y el servidor
  const diferenciaHoraria = new Date().getTimezoneOffset();

  // Crear un nuevo objeto de fecha con la diferencia horaria ajustada
  const fechaAjustada = new Date(fecha);
  fechaAjustada.setMinutes(fechaAjustada.getMinutes() + diferenciaHoraria);

  // Formatear la fecha ajustada en formato dd/mm/aaaa
  return fechaAjustada.toLocaleDateString();
}

// FECHA MAS CERCANA
const obtenerBungalowFechaMasCercana = (reservas) => {
  const fechasIngreso = reservas.map(reserva => ({
    fecha: new Date(reserva.fechaIngreso),
    bungalow: reserva.bungalow
  }));
  const fechaActual = new Date();

  // Filtrar las fechas de ingreso que sean posteriores a la fecha actual
  const fechasFuturas = fechasIngreso.filter(fecha => fecha.fecha >= fechaActual);

  if (fechasFuturas.length > 0) {
    // Ordenar las fechas futuras en orden ascendente
    fechasFuturas.sort((a, b) => a.fecha - b.fecha);
    const fechaMasCercana = formatearFecha(fechasFuturas[0].fecha);
    const bungalowMasCercano = fechasFuturas[0].bungalow;
    return `Bungalow ${bungalowMasCercano} con Check-In el día ${fechaMasCercana}`;
  } else {
    return 'No hay reservas próximas';
  }
};

  return (
    <div className="wrapper">
      <div className="box a d-flex align-items-center justify-content-center">Hay {reservas.length} reservas confirmadas.</div>
      <div className="box b">
        <h2 className='text-center'>Lista de Tareas</h2>
        <ul>
          {tareas.map(tarea => (
            <li key={tarea._id}>
              Bungalow: {tarea.bungalow}<br />
              Persona: {tarea.persona}<br />
              Fecha: {formatearFecha(tarea.fecha)}<br />
              Descripción: {tarea.descripcion}<br />
            </li>
          ))}
        </ul>
      </div>
      <div className="box c">
          <div id="chart-container">
            <ChartLine />
          </div>
        </div>
    </div>
  );
};
