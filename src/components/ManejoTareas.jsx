import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ManejoTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState({
    bungalow: '',
    persona: '',
    fecha: '',
    descripcion: ''
  });

  useEffect(() => {
    obtenerTareas();
  }, []);

  useEffect(() => {
    obtenerTareas(); // Volver a cargar las tareas cuando haya cambios en el estado de tareas
  }, [tareas]);

  const obtenerTareas = () => {
    axios.get('http://localhost:3000/tareas')
      .then(response => {
        setTareas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las tareas:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevaTarea(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/tareas', nuevaTarea)
      .then(() => {
        setNuevaTarea({
          bungalow: '',
          persona: '',
          fecha: '',
          descripcion: ''
        });
      })
      .catch(error => {
        console.error('Error al crear la tarea:', error);
      });
  };

  const eliminarTarea = (tareaId) => {
    axios.delete(`http://localhost:3000/tareas/${tareaId}`)
      .catch(error => {
        console.error('Error al eliminar la tarea:', error);
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
  return (
    <div className="container">
    <form className='border rounded p-3 mt-3' onSubmit={handleSubmit}>
    <h1 className='display-5 mt-2 mb-2'>Administrador de tareas</h1>
        <div className="mb-3">
          <label className="form-label">Bungalow:</label>
          <input
            type="text"
            className="form-control"
            placeholder='Bungalow'
            name="bungalow"
            value={nuevaTarea.bungalow}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
  <label className="form-label">Persona:</label>
  <select
    className="form-control"
    name="persona"
    value={nuevaTarea.persona}
    onChange={handleInputChange}
  >
    <option value="">Seleccione una persona</option>
    <option value="Mariana Bergter">Mariana Bergter</option>
    <option value="Daniela Oriana">Daniela Oriana</option>
    <option value="Maria Ojeda">Maria Ojeda</option>
  </select>
</div>

        <div className="mb-3">
          <label className="form-label">Fecha:</label>
          <input
            type="date"
            className="form-control"
            name="fecha"
            value={nuevaTarea.fecha}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <textarea
            className="form-control"
            placeholder='Descripcion de la tarea'
            name="descripcion"
            value={nuevaTarea.descripcion}
            onChange={handleInputChange}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn" id='boton-crear-tarea'>Crear Tarea</button>
        </div>      
      </form>
      <h1 className='display-5 mt-5 mb-5'>Lista de Tareas</h1>
      <div className="row mb-5">
        {tareas.map(tarea => (
          <div key={tarea._id} className="col-md-4">
      <div className="card mb-3">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-center">Bungalow: {tarea.bungalow}</h5>
          <h6 className="card-subtitle mb-2 mt-2 text-muted">Persona: {tarea.persona}</h6>
          <p className="card-text mt-2">Fecha: {formatearFecha(tarea.fecha)}</p>
          <p className="card-text">Descripción: {tarea.descripcion}</p>
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-danger" onClick={() => eliminarTarea(tarea._id)}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};
