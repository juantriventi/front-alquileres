import { Route, Routes } from "react-router-dom"
import Reservas from "../views/reservas"
import Home from "../views/home"
import Tareas from "../views/tareas"

const Router = () => {

    return (
  
          <Routes>
              <Route path="/" element={ <Home /> } />
              <Route  path="/reservas" element= { <Reservas /> } />
              <Route  path="/tareas" element= { <Tareas /> } />
          </Routes> 
          
          )   
  
  }
  
  export default Router