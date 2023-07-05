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
  export default formatearFecha;