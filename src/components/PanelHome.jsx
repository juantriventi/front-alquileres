import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChartLine } from './ChartLine';
import { ChartCantidad } from './ChartCantidad';
import { ChartTareas } from './ChartTareas';
import formatearFecha from '../utils/formatearFecha';

export const PanelHome = () => {
  const [reservas, setReservas] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [bungalowFechaMasCercana, setBungalowFechaMasCercana] = useState('');
  const [selectedOption, setSelectedOption] = useState('reservas');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    obtenerReservas();
    obtenerTareas();
  }, []);

  // RESERVAS
  const obtenerReservas = () => {
    axios.get('http://localhost:3000/reservas')
      .then(response => {
        setReservas(response.data);
      })
      .catch(error => console.error('Error al obtener las reservas:', error));
  };

  // TAREAS
  const obtenerTareas = () => {
    axios.get('http://localhost:3000/tareas')
      .then(response => {
        setTareas(response.data.slice(0, 3)); // Mostrar solo las primeras 2 tareas
      })
      .catch(error => {
        console.error('Error al obtener las tareas:', error);
      });
  };

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
      return <p>{fechaMasCercana}</p>;
    } else {
      return 'No hay reservas próximas';
    }
  };

  return (
    <div className="wrapper">
      <div className="box a d-flex align-items-center display-6 text-left">
       Reservas: <br/> {reservas.length}
      </div>
      <div className="box e align-items-center display-6 text-left">
       <p className="reservas-panel-home"> Proxima:</p> {obtenerBungalowFechaMasCercana(reservas)}
      </div>
      <div className="box b">
        <div className="chart-box-b">
          <h2 className="text-center mb-4 display-6">Tareas por persona</h2>
      <ChartTareas />
        </div>
        {/* <h2 className='text-center'>Lista de Tareas</h2>
        <ul>
          {tareas.map(tarea => (
            <li className='lista-tareas-home' key={tarea._id}>
              Bungalow: {tarea.bungalow} <br />
              Persona: {tarea.persona}<br />
              Fecha: {formatearFecha(tarea.fecha)}<br />
              Descripción: {tarea.descripcion}<br />
            </li>
          ))}
        </ul> */}
      </div>
      <div className="box c">
      <select className="select-switch-home" value={selectedOption} onChange={handleSelectChange}>
        <option value="reservas">Mostrar Reservas</option>
        <option value="beneficios">Mostrar Beneficios</option>
      </select>
    <div id="chart-container">
      {selectedOption === 'reservas' ? <ChartCantidad /> : <ChartLine /> }
    </div>
      </div>
    </div>
  );
};
