import React, { useState, useEffect } from 'react';
import '../App.css';

export const ListaReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [nuevaReserva, setNuevaReserva] = useState({
    bungalow: '',
    persona: '',
    fechaIngreso: '',
    fechaSalida: '',
    pago: ''
  });
  const [camposIncompletos, setCamposIncompletos] = useState(false);

  useEffect(() => {
    actualizarReservas();
  }, [reservas]);

  function actualizarReservas() {
    fetch('http://localhost:3000/reservas')
      .then(response => response.json())
      .then(data => setReservas(data))
      .catch(error => console.error('Error al obtener las reservas:', error));
  }

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

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNuevaReserva(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validar campos vacíos
    if (
      nuevaReserva.bungalow === '' ||
      nuevaReserva.persona === '' ||
      nuevaReserva.fechaIngreso === '' ||
      nuevaReserva.fechaSalida === '' ||
      nuevaReserva.pago === ''
    ) {
      setCamposIncompletos(true);
      return;
    }

    fetch('http://localhost:3000/reservas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaReserva)
    })
      .then(response => response.json())
      .then(data => {
        setReservas(prevReservas => [...prevReservas, data]);
        resetFormulario();
      })
      .catch(error => console.error('Error al crear la reserva:', error));
  }

  function eliminarReserva(reservaId) {
    fetch(`http://localhost:3000/reservas/${reservaId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        setReservas(prevReservas =>
          prevReservas.filter(reserva => reserva._id !== reservaId)
        );
      })
      .catch(error => console.error('Error al eliminar la reserva:', error));
  }

  function resetFormulario() {
    setNuevaReserva({
      bungalow: '',
      persona: '',
      fechaIngreso: '',
      fechaSalida: '',
      pago: ''
    });
    setCamposIncompletos(false);
  }

  return (
    <div>
     

      <table className='tabla-reservas border rounded p-5'>
        <thead>
          <tr>
            <th>Persona</th>
            <th>Bungalow</th>
            <th>Fecha de Ingreso</th>
            <th>Fecha de Salida</th>
            <th>Pago</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {reservas.map(reserva => (
            <tr key={reserva._id}>
              <td>{reserva.persona}</td>
              <td>{reserva.bungalow}</td>
              <td>{formatearFecha(reserva.fechaIngreso)}</td>
              <td>{formatearFecha(reserva.fechaSalida)}</td>
              <td>usd {reserva.pago}</td>
              <td>
                <button className="btn btn-danger" onClick={() => eliminarReserva(reserva._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <label>
                <input
                  className='text-center'
                  type="text"
                  placeholder='Persona'
                  name="persona"
                  value={nuevaReserva.persona}
                  onChange={handleInputChange}
                />
              </label>
            </td>
            <td>
              <label>
                <input
                  className='text-center'
                  type="text"
                  placeholder='Bungalow'
                  name="bungalow"
                  value={nuevaReserva.bungalow}
                  onChange={handleInputChange}
                />
              </label>
            </td>
            <td>
              <label>
                <input
                  className='text-center'
                  type="date"
                  name="fechaIngreso"
                  value={nuevaReserva.fechaIngreso}
                  onChange={handleInputChange}
                />
              </label>
            </td>
            <td>
              <label>
                <input
                  className='text-center'
                  type="date"
                  name="fechaSalida"
                  value={nuevaReserva.fechaSalida}
                  onChange={handleInputChange}
                />
              </label>
            </td>
            <td>
              <label>
                <input
                  className='text-center'
                  type="text"
                  placeholder='Pago'
                  name="pago"
                  value={nuevaReserva.pago}
                  onChange={handleInputChange}
                />
              </label>
            </td>
            <td>
              <button className="btn btn-primary" onClick={handleSubmit}>Agregar</button>
            </td>
          </tr>
        </tbody>
      </table>
      {camposIncompletos && <p className="text-center">Por favor, complete todos los campos.</p>}
    </div>
  );
}
